
angular
    .module('yamApp')
        .service('mealsService', ['$http', function($http) {

            var msAPI = {},
                    baseUrl = "meals";

            // msAPI.getMeals = function() {
            //     return $http.get(baseUrl);
            // };
            //
            // msAPI.getAMeal = function(id) {
            //     return $http.get(baseUrl + "/"+ id);
            // };

            msAPI.getMeals = function() {
                return $http.get("data/meals.json");
            };

            msAPI.getAMeal = function(id) {
                return $http.get("data/meal_" + id + ".json");
            };

            msAPI.getDeals = function() {
                return $http.get( baseUrl + "deals.json");
            };

            msAPI.getStores = function() {
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