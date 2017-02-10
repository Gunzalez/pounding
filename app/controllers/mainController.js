
angular
    .module('yamApp')
    .controller('mainController', ['$scope', 'mealsService', '$routeParams', 'navigatorService', '$rootScope', '$route', '$location', function ($scope, mealsService, $routeParams, navigatorService, $rootScope, $route, $location) {

        window.scroll(0,0);

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

        $scope.socialLinks = [
            {
                title: "Facebook",
                url: "http://www.facebook.com",
                icon: "fa-facebook"
            },
            {
                title: "Twitter",
                url: "https://twitter.com/?lang=en-gb",
                icon: "fa-twitter"
            },
            {
                title: "Instagram",
                url: "https://www.instagram.com/?hl=en",
                icon: "fa-instagram"
            },
            {
                title: "Google Plus",
                url: "https://plus.google.com/",
                icon: "fa-google-plus"
            }
        ];

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




    }]);