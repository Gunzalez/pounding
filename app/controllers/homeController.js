
angular
    .module('yamApp')
    .controller('homeController', function ($scope) {

        $scope.meals = [
            {
                "id":"meal-1",
                "title":"Meal 1",
                "image":"meal-1.jpg",
                "description":"This is meal 1"
            },
            {
                "id":"meal-2",
                "title":"Meal 2",
                "image":"meal-2.jpg",
                "description":"This is meal 2"
            },
            {
                "id":"meal-3",
                "title":"Meal 3",
                "image":"meal-3.jpg",
                "description":"This is meal 3"
            },
            {
                "id":"meal-4",
                "title":"Meal 4",
                "image":"meal-4.jpg",
                "description":"This is meal 4"
            },
            {
                "id":"meal-2",
                "title":"Meal 2",
                "image":"meal-5.jpg",
                "description":"This is meal 2"
            },
            {
                "id":"meal-3",
                "title":"Meal 3",
                "image":"meal-6.jpg",
                "description":"This is meal 3"
            }
        ];
    });