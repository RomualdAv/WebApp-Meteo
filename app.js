const express = require('express');
const Twig = require('twig');
const path = require('path');

const app = express();
const port = 3000;


app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexController = require(path.join(__dirname, 'controllers/indexController'));
app.use('/', indexController);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
