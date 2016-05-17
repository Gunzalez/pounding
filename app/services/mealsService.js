
angular
    .module('yamApp')
        .service('mealsService', ['$http', function($http) {

            var msAPI = {},
                    baseUrl = "data/";

            msAPI.getMeals = function() {
                return $http.get( baseUrl + "meals.json");
            };

            msAPI.getAMeal = function(id) {
                return $http.get( baseUrl + "meal_"+ id +".json");
            };

            msAPI.getDeals = function() {
                return $http.get( baseUrl + "deals.json");
            };

            msAPI.getStores = function(id) {
                return $http.get( baseUrl + "stores.json");
            };

            msAPI.selectedMeal = null;

            return msAPI;
        }])

        .service('navigatorService', ['$location', function ($location){

            var pydNavigator = {};
            pydNavigator.goToLocation = function(destination){
                if($location.url() != destination){
                    $location.url(destination)
                }
            };
            return pydNavigator;
        }]);