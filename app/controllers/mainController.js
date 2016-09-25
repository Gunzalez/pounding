
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', '$routeParams', 'navigatorService', '$rootScope', '$route', '$location', function ($scope, mealsService, $routeParams, navigatorService, $rootScope, $route, $location) {

        var vm = this;
        vm.selectedMeal = null;
        vm.shouldShowVideo = false;
        vm.shouldShowForm = false;
        vm.shouldShowCookHeader = false;
        vm.shouldShowAuxMenu = false;

        var clearMealSettings = function(){
            vm.selectedMeal = null;
            vm.shouldShowVideo = true;
            vm.shouldShowForm = true;
            vm.shouldShowCookHeader = false;
            vm.shouldShowAuxMenu = false;
        };

        vm.resetMeal = function(){
            navigatorService.goToLocation('/');
        };

        $rootScope.$on('mealFetched', function() {
            //vm.selectedMeal = mealsService.selectedMeal;
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
            } else {
                console.log($rootScope.actualLocation);
            }
        });

        // $rootScope.$watch(function() {return $location.path()}, function (newLocation) {
        //     if($rootScope.actualLocation === newLocation) {
        //         if((newLocation + '') == '/'){
        //             clearMealSettings();
        //         }
        //     }
        // });

        $scope.$watch(function() {return vm.selectedMeal}, function () {
            if(vm.selectedMeal != null){
                vm.shouldShowVideo = false;
                vm.shouldShowAuxMenu = true;
                vm.shouldShowForm = false;
                vm.shouldShowCookHeader = true;
                navigatorService.goToLocation('/cook/'+vm.selectedMeal.id);
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