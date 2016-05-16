
angular
    .module('yamApp')
    .controller('mainController', function ($scope) {

        var vm = this;
        vm.selectedMeal = null;
        vm.cookThisMeal = function(){
            alert('Show cooking details for ' +vm.selectedMeal.title);
        };
        vm.askForPosCode = function(){
            alert('Ask for post code');

        };
        vm.doesSelectImageExist = function(){
            if(vm.selectedMeal){
                return vm.selectedMeal.image;
            } else {
                return 'meal-1.jpg'
            }
        };
        vm.meals = [
            {
                "id":"meal-1",
                "title":"Pounded Yam and Egusi stew",
                "image":"meal-1.jpg",
                "description":"This is meal 1"
            },
            {
                "id":"meal-2",
                "title":"Rice and Plantain",
                "image":"meal-2.jpg",
                "description":"This is meal 2"
            },
            {
                "id":"meal-3",
                "title":"Eba with Okra stew",
                "image":"meal-3.jpg",
                "description":"This is meal 3"
            },
            {
                "id":"meal-4",
                "title":"Yam porridge",
                "image":"meal-4.jpg",
                "description":"This is meal 4"
            }
        ];
    });