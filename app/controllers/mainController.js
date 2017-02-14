
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', 'siteContentService', '$routeParams', 'navigatorService', '$rootScope', '$route', '$location', function ($scope, mealsService, siteContentService, $routeParams, navigatorService, $rootScope, $route, $location) {

        window.scroll(0,0);

        var vm = this;
        vm.selectedMeal = null;
        vm.shouldShowVideo = false;
        vm.shouldShowForm = false;
        vm.shouldShowCookHeader = false;
        vm.shouldShowAuxMenu = false;
        vm.socialLinks = [];

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

        vm.useIdFromParamsIfPresent = function () {
            var params = String($location.path()).split('/');
            if(params.length > 1 && params[params.length-1] != ""){
                var mealId = params[params.length-1];
                if (!vm.selectedMeal && vm.meals){
                    vm.meals.forEach(function(obj){
                        if(obj['id'] == mealId){
                            vm.selectedMeal = obj
                        }
                    });
                }
            }
        };

        $rootScope.$on('$locationChangeSuccess', function() {
            if(String($location.path()) == '/'){
                clearMealSettings();
            } else {
                vm.useIdFromParamsIfPresent();
            }
        });

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

        mealsService.getMeals()
            .success(function (data) {
                vm.meals = data;
                vm.useIdFromParamsIfPresent();
            }).error(function (error) {
            vm.status = 'Unable to load meals data: ' + error.message;
        });

        siteContentService.getMediaLinks()
            .success(function (data) {
                vm.socialLinks = data;
            }).error(function (error) {
            vm.status = 'Unable to load social media links data: ' + error.message;
        });

        vm.showMealMenu = function() {
            $scope.showModal = true;
        };

        vm.ok = function() {
            $scope.showModal = false;
        };

        vm.cancel = function() {
            $scope.showModal = false;
        };

        vm.selectThisMeal = function(meal){
            if(vm.selectedMeal !== meal){
                vm.selectedMeal = meal;
            }
            $scope.showModal = false;
        }

    }]);