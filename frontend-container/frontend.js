var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();
var router = express.Router();

var homeController = require('./controllers/homeController');
var anagramPuzzleController = require('./controllers/anagramPuzzleController');

router.get('/', homeController.index);
router.get('/Anagram', anagramPuzzleController.index);

// Set up the app to use a template engine
// See https://expressjs.com/en/guide/using-template-engines.html for more information
// Tells express where the template files are located
app.set('views', path.join(__dirname, 'views'));
// Tells express that the template engine used will be jade
app.set('view engine', 'jade');

// Add content compression middleware
app.use(compression());

// Add static middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

app.use(router);
app.listen(3000);

