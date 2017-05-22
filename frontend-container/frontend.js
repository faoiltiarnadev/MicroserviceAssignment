var url = require('url');
var grpc = require('grpc');

var proto = grpc.load('interface.proto');

var client = new proto.anagram.AnagramService('backend:50051');

function getAnagram(response, query) {

    console.log(query);

    var word = query.word.toLocaleLowerCase() || "hello";

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

var http = require('http');
var server = http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    getAnagram(response, url.parse(request.url, true).query);
});
server.listen(3000);
