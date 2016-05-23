
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', 'navigatorService', '$rootScope', '$route', '$location', function ($scope, mealsService, navigatorService, $rootScope, $route, $location) {

        var vm = this;
        vm.selectedMeal = null;
        vm.shouldShowForm = true;
        vm.shouldShowCookHeader = false;

        var clearMealSettings = function(){
            vm.selectedMeal = null;
            vm.shouldShowForm = true;
            vm.shouldShowCookHeader = false;
        };

        vm.selectThisMeal = function(){
            mealsService.selectedMeal = vm.selectedMeal;
            navigatorService.goToLocation('/cook/'+vm.selectedMeal.id);
        };

        vm.resetMeal = function(){
            clearMealSettings();
            navigatorService.goToLocation('/');
        };

        vm.askForPostCode = function(){
            alert('Ask for post code');
        };

        vm.doesSelectImageExist = function(){
            var defaultBackground = document.querySelectorAll("div.hero-image")[0].getAttribute('data-default-image');
            if(vm.selectedMeal){
                return vm.selectedMeal.image;
            } else {
                return defaultBackground;
            }
        };

        $rootScope.$on('mealFetched', function() {
            vm.selectedMeal = mealsService.selectedMeal;
            vm.shouldShowForm = false;
            vm.shouldShowCookHeader = true;
        });

        mealsService.getMeals()
            .success(function (data) {
                vm.meals = data;
            }).error(function (error) {
                vm.status = 'Unable to load meals data: ' + error.message;
        });

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
            if($rootScope.actualLocation === newLocation) {
                if((newLocation + '') == '/'){
                    clearMealSettings();
                }
            }
        });

    }]);