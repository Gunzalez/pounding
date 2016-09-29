var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.get('/express', function (req, res) {
    console.log('Express page called on GET');
    res.send('Express')
});


app.listen(PORT, function () {
    console.log('Express ever started on PORT: ' + PORT);

});