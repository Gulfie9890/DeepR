const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/research', async (req, res) => {
  const { project_name, project_website, project_twitter } = req.body;
  // Placeholder for deep research logic
  res.json({
    result: `Deep research for ${project_name} (Website: ${project_website}, Twitter: ${project_twitter}) will appear here.`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});