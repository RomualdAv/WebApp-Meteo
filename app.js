const express = require('express');
const Twig = require('twig');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // permet à Express d'analyser les données envoyées dans le corps d'une requête POST

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

const indexController = require(path.join(__dirname, 'controllers/indexController'));
app.use('/', indexController);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});