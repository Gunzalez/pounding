angular
    .module('yamApp', [
        'ngRoute',
        'ngSanitize'
    ])

    // Routing
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .when('/cook/:id', {
                templateUrl: 'views/detail.html',
                controller: 'detailController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
