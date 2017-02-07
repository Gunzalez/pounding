
angular
    .module('yamApp')
    .controller('homeController', ['$scope', 'mealsService', function ($scope, mealsService) {

        window.scroll(0,0);

        $scope.meals = [];
        mealsService.getMeals()
            .success(function (data) {
                $scope.meals = data.slice(1, 5);
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });
    }]);