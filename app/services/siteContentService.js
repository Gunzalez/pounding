
angular
    .module('yamApp')
        .service('siteContentService', ['$http', function($http) {

            var api = {},
                baseUrl = "socialmedia";

            api.getMediaLinks = function() {
                return $http.get(baseUrl);
            };

            return api;
        }]);
