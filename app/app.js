angular
    .module('yamApp', [
        'ngRoute',
        'ui.bootstrap.modal'
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
                var topBarEl = element[0].getElementsByClassName('top-bar')[0];
                var topBar = angular.element(topBarEl);
                if (this.pageYOffset > 10) {
                    topBar.removeClass('top');
                } else {
                    topBar.addClass('top');
                }
                scope.$apply();
            });
        };
    })

    .filter('time', function() {
        return function(seconds) {
            var hh = Math.floor(seconds / 3600), mm = Math.floor(seconds / 60) % 60, ss = Math.floor(seconds) % 60;
            return hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
        };
    });
