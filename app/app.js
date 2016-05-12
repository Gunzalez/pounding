var poundedYamApp = angular.module('poundedYamApp', [
    'poundedYamAppControllers',
    'ngRoute'
]);


// Routing
poundedYamApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
