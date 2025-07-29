import React, { useState } from 'react';
import './App.css';

function App() {
  const [projectName, setProjectName] = useState('');
  const [projectWebsite, setProjectWebsite] = useState('');
  const [projectTwitter, setProjectTwitter] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_name: projectName,
          project_website: projectWebsite,
          project_twitter: projectTwitter,
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch research');
      const data = await response.json();
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Deep Research Prototype</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 320 }}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Project Website"
            value={projectWebsite}
            onChange={e => setProjectWebsite(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Project Twitter"
            value={projectTwitter}
            onChange={e => setProjectTwitter(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Researching...' : 'Start Deep Research'}
          </button>
        </form>
        {result && (
          <div style={{ marginTop: 24, background: '#222', padding: 16, borderRadius: 8, maxWidth: 600 }}>
            <h2>Research Result</h2>
            <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{result}</pre>
          </div>
        )}
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      </header>
    </div>
  );
}

export default App;
