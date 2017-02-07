var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

var meals = [
    {
        "id":"1",
        "title":"Pounded Yam",
        "image":"pounded-yam.jpg",
        "description":"Delicious and very popular, best when served with Egusi soup.",
        "strapline":"There is a faster way",
        "time":"30 min",
        "count":"11",
        "instructions": "<p>This should be all about Pounded yam</p>",
        "ingredients": "<p>Pounded, pounded yam I say</p>",
        "about": "<p>Pounded Yam is one of the Nigerian fufu recipes that is eaten with the various Nigerian soup recipes.</p><p>The most popular combinations are Pounded Yam with Egusi Soup. </p><p>Alternatively Pounded Yam can be prepared by stirring yam flour in hot water.</p>",
        "featured": true
    },
    {
        "id":"2",
        "title":"Fried Plantain",
        "image":"rice-and-plantain.jpg",
        "description":"Great snack on it's own but better as a versatile side dish",
        "strapline":"It's easier than you think",
        "time":"20 min",
        "count":"16",
        "video":"N9dpPNP58Iw",
        "instructions": [
                'Peal and slice roughly into thin discs',
                'Add salt to taste',
                'Heat up the oil in a deep pan',
                'Place discs into hot oil with fork',
                'Always attend, turn over when golden brown on the edges',
                'All done when brown on both sides',
                'Serve on its own or as a side dish'
        ],
        "ingredients": [
            '3 ripe plantain',
            'A large deep frying page',
            'Enough vegetable for deep frying'
        ],
        "about": "<p>Fried Plantain can be eaten in a variety of ways. It will often come to the rescue when you need a fast and easy meal. </p><p>A popular side dish to many of the rice recipes and can be enjoyed by people from all over the world.</p><p> Low in fat and super delicious.</p>",
        "featured": true
    },
    {
        "id":"3",
        "title":"Eba",
        "image":"eba-and-okra.jpg",
        "description":"Starchy meal, super quick to make but rather heavy",
        "strapline":"Really quick to make",
        "time":"30 min",
        "count":"14",
        "video":"rDuetklFtDQ",
        "instructions": [
            'Boil about 300 ml of water',
            'Sprinkle the Cari to it while stirring with spatula',
            'Stir until harden to preferred density',
            'This is always served as side dish'
        ],
        "ingredients": [
            '500 gram of Gari powder',
            'A medium sized put',
            'Large wooden spoon or spatula'
        ],
        "about": "<p>Garri is a major fufu recipe in Nigeria. It is processed from cassava. </p><p>It isn't clear where the word Garri originated from, but many think it is derived from the Hausa word for grain: <strong>Garin</strong>.</p><p> You can add cold water, sugar, milk, groundnuts (peanuts) and drink it like cereal.</p>",
        "featured": true
    },
    {
        "id":"4",
        "title":"Yam porridge",
        "image":"yam-porridge.jpg",
        "description":"The choice yam recipe if you like your yam meals soupy.",
        "strapline":"Nice ans soupy",
        "time":"120 min",
        "count":"9",
        "instructions": "<p>What to do with the stuff to be making the meal, the meal being of course Yam porridge rice and plantain.</p>",
        "ingredients": "<p>Need people to add in content here</p><p>It's all about Yam porridge!</p>",
        "about": "<p>You need a tasty yam recipe in no time? This is for you! Referred to as yam soup,<br /> it's mainly yam cooked with ingredients and the resulting dish contains a soupy liquid or curry.</p><p> It is usually not cooked with added vegetables but can be added for some green colour to the meal.</p>",
        "featured": true
    },
    {
        "id":"5",
        "title":"Beans",
        "image":"beans-and-dodo.jpg",
        "description":"Really rich in protein so expect to toot all day after this.",
        "strapline":"Well worth the wait",
        "time":"120 min",
        "count":"5",
        "instructions": "<p>I was such an idiot when I was younger, what the hell go into me.</p>",
        "ingredients": "<p>Black-Eyed or Brown beans are rich in high quality</p><p>I cook this all the time and my kids never eat it.</p>",
        "about": "<p>Black-Eyed or Brown beans are rich in high quality protein which provides a healthy alternative to meat and other animal protein.</p><p>Ewa is delicious on its own or when accompanied with various other foods such as Nigerian fried plantain.</p><p>One of Nigeria’s everyday foods and it is easy to prepare as you can see below.</p>",
        "featured": true
    },
    {
        "id":"6",
        "title":"Jollof Rice",
        "image":"jollof.jpg",
        "description":"The party food of all party foods, with a million variations",
        "strapline":"Everyone loves some jollof",
        "time":"120 min",
        "count":"6",
        "instructions": "<p>What to do with the stuff to be making the meal, the meal being of course Jollof rice and plantain.</p>",
        "ingredients": "<p>A set of stuff what goes in to make said meal, said meal being Jollof rice and plantain.</p>",
        "about": "<p>Some prefer the traditional spicy taste with a characteristic smoky flavour imparted by the cast iron pots in which it has been cooked.</p><p> Others prefer an al-dente style with the grains not sticking together. </p><p>A recent survey concluded that we all like to enjoy our Jollof rice in different and imaginative ways.</p>",
        "featured": true
    }
];



app.get('/meals', function (req, res) {
    res.json(meals);
});

app.get('/meals/:id', function (req, res) {
    var mealId = parseInt(req.params.id);
    var selectedMeal = undefined;

    for(var x=0; x<meals.length; x++){
        if(meals[x].id == mealId){
            selectedMeal = meals[x];
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