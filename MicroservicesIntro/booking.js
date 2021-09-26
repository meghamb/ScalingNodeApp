const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./data-bookings');

const loadBookings = () => JSON.parse(localStorage.getItem('bookings') || '{}');
const saveBookings = (bookings) =>
  localStorage.setItem('bookings', JSON.stringify(bookings, null, 2));

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/bookings/:id', (req, res) => {
  const bookings = loadBookings();
  const booking = bookings[req.params.id] || [];
  res.json({ booking });
});

app.post('/reserveTickets', (req, res) => {
  const movies = loadMovies(); // [TODO] replace this function with api call to do this use axios
  const bookings = loadBookings();
  if (!req.body.count) {
    res.status(400).json({ error: 'tickets count not found' });
  }
  if (!req.body.name) {
    res.status(400).json({ error: 'tickets name not found' });
  }
  if (!req.body.movieId) {
    res.status(400).json({ error: 'tickets id not found' });
  }
  let count = parseInt(req.body.count);
  let movie = movies.find((movie) => movie.id === req.body.movieId);
  if (!movie) {
    res.status(400).json({ error: 'movie name not found' });
  }
  const remainingSeats = movie.available - movie.reserved;
  if (remainingSeats < count) {
    res.status(200).json({ message: 'not enough seats' });
  }
  let list = bookings[req.body.movieId];
  let reservation = { name: req.body.name, guests: req.body.count };
  if (!list) {
    bookings[req.body.movieId] = [];
  }
  bookings[req.body.movieId].push(reservation);
  movie.reserved += count;
  saveBookings(bookings);
  saveMovies(movies);
  res.json({ success: true, movieId: req.body.movieId, ...reservation });
});

app.delete('/cancelTickets', (req, res) => {
  const movies = loadMovies();
  const bookings = loadBookings();
  const { movieId, name } = req.body;
  const booking = bookings[movieId].find((booking) => booking.name === name);
  bookings[movieId] = bookings[movieId].filter(
    (booking) => booking.name !== name
  );
  saveBookings(bookings);
  res.json({ success: true, movieId, ...booking });
});

app.get('/', (req, res) => {
  const bookings = loadBookings();
  res.status(200).json({ bookings });
  console.log('bookings loaded');
});

app.listen(3002, () => {
  console.log('ticket system is up!');
});
