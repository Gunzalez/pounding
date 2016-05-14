
angular
    .module('poundedYamApp')
    .controller('mainController', function ($scope) {

        var vm = this;
        vm.selectedMeal = null;
        vm.cookThisMeal = function(){
            alert(vm.selectedMeal.title);
        };
        vm.askForPosCode = function(){

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