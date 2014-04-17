        angular.module('angular-google-map', ['placeSearchDirectives']);

        /* Controllers */
        function SearchForm($scope){
            $scope.location = '';

            $scope.doSearch = function(){
                if($scope.location === ''){
                    alert('Directive did not update the location property in parent controller.');
                } else {
                    alert('Yay. Location: ' + $scope.location);
                }
            };
        }

        /* Directives */
        angular.module('placeSearchDirectives', []).
            directive('googlePlaces', function(){
                return {
                    restrict:'E',
                    replace:true,
                    // transclude:true,
                    scope: {location:'='},
                    template: '<input style="position: absolute; z-index: 200;" id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
                    link: function($scope, elm, attrs){
                        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            var place = autocomplete.getPlace();
                            $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                            $scope.$apply();
                        });
                    }
                }
            });
   
//<div ng-app="angular-google-map" ng-controller="SearchForm">
  //  <google-places location=location></google-places>
 //   <button ng-click="doSearch()" class="btn btn-large btn-primary">Search</button>
