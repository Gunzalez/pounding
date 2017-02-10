
angular
    .module('yamApp')
    .controller('detailController', ['$scope', 'mealsService', '$routeParams', '$rootScope', '$interval', function ($scope, mealsService, $routeParams, $rootScope, $interval) {

        window.scroll(0,0);

        $scope.selectedMeal = {};
        $scope.videoDisplay = document.getElementById('videoEl');
        $scope.videoPlaying = false;
        $scope.currentTime = 0;
        $scope.totalTime = 0;
        $scope.vidHeightCenter = -1000;
        $scope.vidWidthCenter = -1000;
        $scope.scrubTop = -1000;
        $scope.scrubLeft = -1000;
        $scope.looper = undefined;
        $scope.isDragging = false;
        $scope.showOptions = false;

        $scope.initPlayer = function(){
            $scope.currentTime = 0;
            $scope.totalTime = 0;
            $scope.videoDisplay.addEventListener("timeupdate", $scope.updateTime, true);
            $scope.videoDisplay.addEventListener("loadedmetadata", $scope.updateDate, true);
        };

        $scope.updateLayout = function(){
            $scope.scrubTop = document.getElementById('progressMeterFull').offsetTop-2;
            $scope.vidHeightCenter = $scope.videoDisplay.offsetHeight/2 -50;
            $scope.vidWidthCenter = $scope.videoDisplay.offsetWidth/2 -50;
            if(!$scope.$$phase){
                $scope.$apply();
            }
        };

        $scope.looper = $interval(function(){
            if(!$scope.isDragging){
                var t = $scope.videoDisplay.currentTime;
                var d = $scope.videoDisplay.duration;
                //var w = t / d * 100;
                var p = document.getElementById('progressMeterFull').offsetLeft + document.getElementById('progressMeterFull').offsetWidth;
                $scope.scrubLeft = (t / d * p) - 7;
            } else {
                $scope.scrubLeft = document.getElementById('thumbScrubber').offsetLeft;
            }
            $scope.updateLayout();
        }, 100);

        $scope.dragStart = function ($event) {
            $scope.isDragging = true;
        };

        $scope.dragStop = function ($event) {
            if($scope.isDragging){
                $scope.videoSeek($event);
                $scope.isDragging = false;
            }
        };

        $scope.toggleFullScreen = function(){
            var v = $scope.videoDisplay;
            if(v.requestFullscreen){
                v.requestFullscreen();
            } else if(v.mozRequestFullscreen){
                v.mozRequestFullscreen();
            } else if(v.webkitRequestFullscreen){
                v.webkitRequestFullscreen();
            } else if(v.msRequestFullscreen){
                v.msRequestFullscreen();
            }
        };

        $scope.toggleDetails = function(){
            $scope.showOptions = !$scope.showOptions;
        };

        $scope.mouseMoving = function ($event) {
            if($scope.isDragging){
                var winWidth = window.innerWidth;
                var playerWidth = document.getElementById('fullPlayer').clientWidth;
                var adjustedDistance = $event.pageX - (winWidth - playerWidth)/2;
                document.getElementById("thumbScrubber").style.left = adjustedDistance + 'px';

            }
        };

        $scope.updateTime = function(e){
            if(!$scope.videoDisplay.seeking){
                $scope.currentTime = e.target.currentTime;
                var playBtn = document.getElementById('playBtn'),
                    $playBtn = angular.element(playBtn);
                if($scope.currentTime == $scope.totalTime){
                    $scope.videoDisplay.pause();
                    $scope.videoPlaying = false;
                    $scope.videoDisplay.currentTime = 0;
                    $playBtn.find('span').toggleClass("glyphicon-play", true);
                    $playBtn.find('span').toggleClass("glyphicon-pause", false);
                }
            }
        };

        $scope.updateDate = function(e){
            $scope.totalTime = e.target.duration;
        };

        $scope.togglePlay  = function(){
            var playBtn = document.getElementById('playBtn'),
                $playBtn = angular.element(playBtn);
            if($scope.videoDisplay.paused){
                  $scope.videoDisplay.play();
                  $scope.videoPlaying = true;
                  $playBtn.find('span').toggleClass("glyphicon-play", false);
                  $playBtn.find('span').toggleClass("glyphicon-pause", true);
            } else {
                  $scope.videoDisplay.pause();
                  $scope.videoPlaying = false;
                  $playBtn.find('span').toggleClass("glyphicon-play", true);
                  $playBtn.find('span').toggleClass("glyphicon-pause", false);
            }
        };
        
        $scope.videoSeek = function ($event) {
            var winWidth = window.innerWidth;
            var playerWidth = document.getElementById('fullPlayer').clientWidth;
            var adjustedDistance = $event.pageX - (winWidth - playerWidth)/2;

            var w = document.getElementById('progressMeterFull').offsetWidth;
            var d = $scope.videoDisplay.duration;
            var s = Math.round(adjustedDistance / w * d);
            $scope.videoDisplay.currentTime = s + 1;
        };

        $scope.toggleMute  = function(){
            var muteBtn = document.getElementById('muteBtn'),
                $muteBtn = angular.element(muteBtn);
            if($scope.videoDisplay.volume == 0.0){
                $scope.videoDisplay.volume = 1.0;
                $muteBtn.find('span').toggleClass("glyphicon-volume-up", true);
                $muteBtn.find('span').toggleClass("glyphicon-volume-off", false);
            } else {
                $scope.videoDisplay.volume = 0.0;
                $muteBtn.find('span').toggleClass("glyphicon-volume-up", false);
                $muteBtn.find('span').toggleClass("glyphicon-volume-off", true);
            }
        };

        mealsService.getAMeal($routeParams.id)
            .success(function (data) {
                $scope.selectedMeal = data;
                $scope.videoSource = 'video/' + $scope.selectedMeal.video;

                $scope.videoTitle = $scope.selectedMeal.title;
                $scope.videoDescription = $scope.selectedMeal.description;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.$on('$destroy', function() {
            if (angular.isDefined($scope.looper)) {
                $interval.cancel($scope.looper);
                $scope.looper = undefined;
            }
        });

        $scope.initPlayer();

    }]);