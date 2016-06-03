
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', 'navigatorService', '$rootScope', '$route', '$location', function ($scope, mealsService, navigatorService, $rootScope, $route, $location) {

        var vm = this;
        vm.selectedMeal = null;
        vm.shouldShowForm = false;
        vm.shouldShowCookHeader = false;
        vm.shouldShowVideo = false;

        var clearMealSettings = function(){
            vm.selectedMeal = null;
            vm.shouldShowForm = true;
            vm.shouldShowVideo = true;
            vm.shouldShowCookHeader = false;
            vm.shouldShowAuxMenu = false;
        };

        vm.selectThisMeal = function(){
            mealsService.selectedMeal = vm.selectedMeal;
            navigatorService.goToLocation('/cook/'+vm.selectedMeal.id);
        };

        vm.resetMeal = function(){
            clearMealSettings();
            navigatorService.goToLocation('/');
        };

        $rootScope.$on('mealFetched', function() {
            vm.selectedMeal = mealsService.selectedMeal;
            vm.shouldShowForm = false;
            vm.shouldShowCookHeader = true;
            vm.shouldShowVideo = false;
            vm.shouldShowAuxMenu = true;
        });

        mealsService.getMeals()
            .success(function (data) {
                vm.meals = data;
            }).error(function (error) {
                vm.status = 'Unable to load meals data: ' + error.message;
        });

        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
            if(($rootScope.actualLocation + '') == '/'){
                clearMealSettings();
            }
        });

        $rootScope.$watch(function() {return $location.path()}, function (newLocation) {
            if($rootScope.actualLocation === newLocation) {
                if((newLocation + '') == '/'){
                    clearMealSettings();
                }
            }
        });

        $scope.$watch(function() {return vm.selectedMeal}, function () {
            if(vm.selectedMeal != null){
                vm.getHeroImageBackground();
                vm.shouldShowVideo = false;
            }
        });

        vm.getHeroImageBackground = function(){
            if(vm.selectedMeal){
                return vm.selectedMeal.image;
            } else {
                return 'blank.gif';
            }
        };

    }]);