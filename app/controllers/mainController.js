
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', 'navigatorService', '$rootScope', function ($scope, mealsService, navigatorService, $rootScope) {

        var vm = this;
        vm.selectedMeal = null;
        vm.cookMode = false;
        vm.cookThisMeal = function(){
            mealsService.selectedMeal = vm.selectedMeal;
            navigatorService.goToLocation('/cook/'+vm.selectedMeal.id);
        };

        vm.askForPostCode = function(){
            alert('Ask for post code');
        };

        vm.doesSelectImageExist = function(){
            if(vm.selectedMeal){
                return vm.selectedMeal.image;
            } else {
                return 'pepper-soup.jpg'
            }
        };

        vm.isInCookMode = function(){
            return vm.cookMode;
        };

        $rootScope.$on('mealFetched', function() {
            vm.selectedMeal = mealsService.selectedMeal;
            vm.cookMode = true;
        });

        vm.removeMeal = function(){
            vm.selectedMeal = null;
            navigatorService.goToLocation('/');
            vm.cookMode = false;
        };


            $rootScope.$on('doneSelecting', function() {
                vm.selectedMeal = mealsService.selectedMeal;
            });

        mealsService.getMeals()
            .success(function (data) {
                vm.meals = data;
            })
            .error(function (error) {
                vm.status = 'Unable to load meals data: ' + error.message;
            });
    }]);