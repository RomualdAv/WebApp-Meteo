const express = require('express');
const twig = require('twig');

const app = express();

const port = 3000;


app.set('view engine', 'twig');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

app.get('/page1', (req, res) => {
  res.render('page1', { title: 'Page 1' });
});

app.get('/page2', (req, res) => {
  res.render('page2', { title: 'Page 2' });
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
