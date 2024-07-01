
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend API' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
