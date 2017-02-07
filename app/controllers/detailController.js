
angular
    .module('yamApp')
    .controller('detailController', ['$scope', 'mealsService', '$routeParams', '$rootScope', '$sce', function ($scope, mealsService, $routeParams, $rootScope, $sce) {

        window.scroll(0,0);

        $scope.selectedMeal = {};

        $scope.askForPostCode = function(){
            alert('Ask for post code');
        };

        mealsService.getAMeal($routeParams.id)
            .success(function (data) {
                $scope.selectedMeal = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);