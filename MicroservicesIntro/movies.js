const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./data-movies');

const loadMovies = () => JSON.parse(localStorage.getItem('movies') || '[]');
const saveMovies = (movies) =>
  localStorage.setItem('movies', JSON.stringify(movies, null, 2));

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/movies/:id', (req, res) => {
  const movies = loadMovies();
  const movie = movies.find((movie) => movie.id == req.params.id);
  if (!movie) {
    res.json({}).status(404);
  } else res.status(200).json({ movie });
});

app.get('/', (req, res) => {
  const movies = loadMovies();
  res.status(200).json({ movies });
  console.log('movies loaded');
});

app.listen(3001, () => {
  console.log('ticket system is up!');
});
