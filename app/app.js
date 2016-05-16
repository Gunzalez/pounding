angular.module('yamApp', [
    'ngRoute'
])

// Routing
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
