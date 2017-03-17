var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var data = require('./data.js');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/socialmedia', function (req, res) {
    res.json(data.socialMediaLinks);
});

app.get('/meals', function (req, res) {
    res.json(data.listOfMeals);
});

app.get('/meals/:id', function (req, res) {
    var mealId = parseInt(req.params.id);
    var selectedMeal = undefined;

    for(var x=0; x<data.listOfMeals.length; x++){
        if(data.listOfMeals[x].id == mealId){
            selectedMeal = data.listOfMeals[x];
        }
    }

    if(selectedMeal){
        res.json(selectedMeal);
    } else {
        res.status(500).json({'error':'Oops, stuff went wrong'});
    }
});

app.use(express.static(__dirname + '/app' ));

app.listen(PORT, function () {
    console.log('Express ever started on PORT: ' + PORT);
});