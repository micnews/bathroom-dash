var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});

app.use(express.static('dist'));
app.use(express.static('assets'));

var portNumber = 8000;
app.listen(process.env.PORT || portNumber, function () {
  console.log('listening on port ' + (process.env.PORT || portNumber));
});
