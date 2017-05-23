var grpc = require('grpc');
var express = require('express');

var app = express();
var router = express.Router();

var proto = grpc.load('interface.proto');

var client = new proto.anagram.AnagramService('backend:50051');

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

    client.getAnagram(request, function(error, anagram) {
        if (error) {
            response.end(JSON.stringify(error));
        } else {
            response.end(anagram.question + " is an anagram of " + anagram.answer + "\n");
        }
    });
}

router.get('/', function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });

    getAnagram(response, request.query);
 });

app.use(router);
app.listen(3000);
