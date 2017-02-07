
angular
    .module('yamApp')
    .controller('detailController', ['$scope', 'mealsService', '$routeParams', '$rootScope', function ($scope, mealsService, $routeParams, $rootScope) {

        window.scroll(0,0);

        $scope.selectedMeal = {};
        $scope.videoDisplay = document.getElementById('videoEl');

        mealsService.getAMeal($routeParams.id)
            .success(function (data) {
                $scope.selectedMeal = data;
                $scope.videoSource = 'video/' + $scope.selectedMeal.video;

                $scope.videoTitle = $scope.selectedMeal.title;
                $scope.videoDescription = 'video/' + $scope.selectedMeal.video;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);