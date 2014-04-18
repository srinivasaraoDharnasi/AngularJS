var app = angular.module('angular-google-maps', ['google-maps']);


app.directive('autocompleteone', function(){
                return {
                    restrict:'E',
                    replace:true,
                    // transclude:true,
                    scope: {locationsource:'='},
                    template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level" placeholder="Enter source"/>',
                    link: function($scope, elm, attrs){
                        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            var place = autocomplete.getPlace();
                            $scope.locationsource = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                            $scope.$apply();
                        });
                    }
                }
            });
			
			
			
app.directive('autocompletetwo', function(){
                return {
                    restrict:'E',
                    replace:true,
                    // transclude:true,
                    scope: {locationdestination:'='},
                    template: '<input id="google_places_ac2" name="google_places_ac2" type="text" class="input-block-level" placeholder="Enter Destination"/>',
                    link: function($scope, elm, attrs){
                        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac2")[0], {});
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            var place = autocomplete.getPlace();
                            $scope.locationdestination = place.geometry.location.lat() + ',' + place.geometry.location.lng();
							$scope.$apply();
                        });
                    }
                }
            });		





	app.directive('map', function () {
		'use strict';
		var directionsDisplay = new google.maps.DirectionsRenderer(),
			directionsService = new google.maps.DirectionsService(),
			geocoder = new google.maps.Geocoder(),
			map,
			marker,
			mapObj,
			infowindow;
		mapObj = {
			restrict: 'EAC',
				scope: {
					destination: '@',
					markerContent: '@',
					zoom: '=',
					type: '@',
					directions: '@'
				},
        replace: true,
        template: '<form novalidate name="mapContainer" class="mapContainer panel">' +
					'<div id="logo" style="position: absolute; z-index: 200; margin-left: 18%;"><img src="images/logo.png" style="height: 40%; width: 50%;" >    </div>'+
					'<div class="form-wrapper" style="position: absolute; z-index: 200;"><autocompleteone locationsource=locationsource></autocompleteone><autocompletetwo locationdestination=locationdestination></autocompletetwo>		<input type="submit" data-ng-click="getDirections()" value="Search" id="submit">	</div>'+
			        '<div id="theMap"></div>' +
					'<div class="directions" ng-show="directions || directions==undefined">' +
					//'<div id="directionsList"></div>' +
					'</div>' +
					'</form>', 
        link: function (scope, element, attrs) {
            scope.init = function () {
                var mapOptions = {
                    zoom: scope.zoom !== undefined ? scope.zoom : 15,
                    mapTypeId: scope.type,
                    streetViewControl: false
                };
                map = new google.maps.Map(document.getElementById('theMap'), mapOptions);
                scope.endPoint = scope.destination !== undefined ? scope.destination : '1600 Amphitheatre Parkway, Santa Clara County, CA';
                geocoder.geocode({
                    address: scope.endPoint
                }, function (results, status) {
                    var location = results[0].geometry.location;
                    if (status === google.maps.GeocoderStatus.OK) {
                        map.setCenter(location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            animation: google.maps.Animation.DROP
                        });
                        infowindow = new google.maps.InfoWindow({
                            content: scope.markerContent !== undefined ? scope.markerContent : 'Google HQ'
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            return infowindow.open(map, marker);
                        });
                    } else {
                        alert('Cannot Geocode');
                    }
                });
            };
            scope.init();
            scope.getDirections = function () {
			
			if(scope.locationsource === 'undefined'){
			alert('Please Enter Source');
		}else if(scope.locationdestination === 'undefined'){
				alert('Please Enter Destination');
		}else {
			alert('Source: '+scope.locationsource	+'Destination: '+scope.locationdestination);
        }
		        var request = {
                    origin: scope.locationsource,
                    destination: scope.locationdestination,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response)
                        document.getElementById('wrongAddress').style.display = "none";
                    } else {
                        document.getElementById('wrongAddress').style.display = "block";
                    }
                });
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('directionsList'));
            };
            scope.clearDirections = function () {
                scope.init();
                directionsDisplay.setPanel(null);
                scope.origin = '';
            };
        }
    };
    return mapObj;
});	
			

			