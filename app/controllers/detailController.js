
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
                $scope.selectedMeal = data;
                $scope.about = $sce.trustAsHtml($scope.selectedMeal['about']);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);