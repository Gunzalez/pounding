
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', 'navigatorService', '$rootScope', '$route', '$location',
            function ($scope, mealsService, navigatorService, $rootScope, $route, $location) {

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
            if($rootScope.actualLocation === newLocation) {
                if(newLocation = '/'){
                    vm.selectedMeal = null;
                    vm.shouldShowForm = true;
                    vm.shouldShowCookHeader = false;
                }
            }
        });

        var vm = this;
        vm.selectedMeal = null;
        vm.shouldShowForm = true;
        vm.shouldShowCookHeader = false;

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

        $rootScope.$on('mealFetched', function() {
            vm.selectedMeal = mealsService.selectedMeal;
            vm.shouldShowForm = false;
            vm.shouldShowCookHeader = true;
        });

        vm.resetMeal = function(){
            navigatorService.goToLocation('/');
            vm.selectedMeal = null;
            vm.shouldShowForm = true;
            vm.shouldShowCookHeader = false;
        };

        mealsService.getMeals()
            .success(function (data) {
                vm.meals = data;
            })
            .error(function (error) {
                vm.status = 'Unable to load meals data: ' + error.message;
            });
    }]);