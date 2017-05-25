//var grpc = require('grpc');
var express = require('express');
var app = express();
var router = express.Router();
var compression = require('compression');

//var proto = grpc.load('interface.proto');
//var client = new proto.anagram.AnagramService('backend:50051');

router.get('/', function(request, response) {

    response.render('home');

    //getAnagram(response, request.query);
 });

router.get('/Anagram', function(request, response) {

    response.render('anagramPuzzle');
});

// Set up the app to use a template engine
// See https://expressjs.com/en/guide/using-template-engines.html for more information
// Tells express where the template files are located
app.set('views', __dirname + '/views');
// Tells express that the template engine used will be jade
app.set('view engine', 'jade');

// Add content compression middleware
app.use(compression());

// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.use(router);
app.listen(3000);

function getAnagram(response, query) {

    console.log(query);

    var word;

    if (!query.word) {
        word = "hello";
    } else {
        word = query.word.toLocaleLowerCase();
    }

    var request = {
        word: word
    }

    response.end("Hello! :)");

    /* client.getAnagram(request, function(error, anagram) {
     if (error) {
     response.end(JSON.stringify(error));
     } else {
     response.end(anagram.question + " is an anagram of " + anagram.answer + "\n");
     }
     });*/
}
