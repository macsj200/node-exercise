const express = require('express');
const swapi = require('./swapi');

const app = express();

(async () => await swapi.fetchPeople())();

app.get('/people', async (req, res) => res.json(await swapi.fetchPeople(req.query.sortBy)));

app.listen(3000, () => console.log('Example app listening on port 3000!'));