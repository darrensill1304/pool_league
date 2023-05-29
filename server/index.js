const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());

// Endpoint for fetching all the data initially
app.get('/api/data', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('./data/Users.json', 'utf8'));
    const matches = JSON.parse(fs.readFileSync('./data/Matches.json', 'utf8'));
    const ratingHistory = JSON.parse(fs.readFileSync('./data/RatingsHistory.json', 'utf8'));

    res.json({ users, matches, ratingHistory });
  } catch (error) {
    console.error('Error reading data from files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating the Users table
app.post('/api/users', (req, res) => {
  try {
    const { users } = req.body;

    fs.writeFileSync('./data/Users.json', JSON.stringify(users));

    res.json({ message: 'Users table updated successfully' });
  } catch (error) {
    console.error('Error writing Users table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating the Matches table
app.post('/api/matches', (req, res) => {
  try {
    const { matches } = req.body;

    fs.writeFileSync('./data/Matches.json', JSON.stringify(matches));

    res.json({ message: 'Matches table updated successfully' });
  } catch (error) {
    console.error('Error writing Matches table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating the Rating History table
app.post('/api/rating-history', (req, res) => {
  try {
    const { ratingHistory } = req.body;

    fs.writeFileSync('./data/RatingsHistory.json', JSON.stringify(ratingHistory));

    res.json({ message: 'Rating History table updated successfully' });
  } catch (error) {
    console.error('Error writing Rating History table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

