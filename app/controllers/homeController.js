
angular
    .module('yamApp')
    .controller('homeController', ['$scope', 'mealsService', function ($scope, mealsService) {

        $scope.meals = [];
        mealsService.getMeals()
            .success(function (data) {
                $scope.meals = data.slice(1, 4);
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });
    }]);