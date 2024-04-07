const express = require('express');
const twig = require('twig');

const app = express();

const port = 3000;


app.set('view engine', 'twig');
app.set('views', __dirname + '/views');


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
