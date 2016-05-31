
angular
    .module('yamApp')
    .controller('detailController', ['$scope', 'mealsService', '$routeParams', '$rootScope', '$sce', function ($scope, mealsService, $routeParams, $rootScope, $sce) {

        $scope.param = $routeParams.id;
        $scope.selectedMeal = {};

        mealsService.getAMeal($scope.param)
            .success(function (data) {
                $scope.selectedMeal = data;
                mealsService.selectedMeal = $scope.selectedMeal;
                $scope.mealDescription = $sce.trustAsHtml($scope.selectedMeal.about);
                $rootScope.$emit('mealFetched', {});
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);