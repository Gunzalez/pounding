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
    }])

    .directive("scroll", function ($window) {
        return function(scope, element) {
            angular.element($window).bind("scroll", function() {
                var topBarEl = element[0].getElementsByClassName('top-bar');
                var topBar = angular.element(topBarEl)
                if (this.pageYOffset > 10) {
                    topBar.removeClass('top');
                } else {
                    topBar.addClass('top');
                }
                scope.$apply();
            });
        };
    });
