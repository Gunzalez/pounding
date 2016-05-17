
angular
    .module('yamApp')
    .controller('homeController', function ($scope, mealsService) {

        $scope.meals = [];
        mealsService.getMeals()
            .success(function (data) {
                $scope.meals = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });


    });