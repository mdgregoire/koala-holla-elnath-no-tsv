var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

const koalaRouter = require('./routers/koalaRouter');
app.use('/koalas', koalaRouter);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
