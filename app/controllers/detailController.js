
angular
    .module('yamApp')
    .controller('detailController', ['$scope', 'mealsService', '$routeParams', '$rootScope', '$sce', function ($scope, mealsService, $routeParams, $rootScope, $sce) {

        $scope.param = $routeParams.id;
        $scope.selectedMeal = {};
        $scope.askForPostCode = function(){
            alert('Ask for post code');
        };

        mealsService.getAMeal($scope.param)
            .success(function (data) {
                console.log(data);
                $scope.selectedMeal = data;
                $scope.mealDescription = $sce.trustAsHtml($scope.selectedMeal['about']);
                $scope.mealIngredients = $sce.trustAsHtml($scope.selectedMeal['ingredients']);
                $scope.mealInsructions = $sce.trustAsHtml($scope.selectedMeal['instructions']);

            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);