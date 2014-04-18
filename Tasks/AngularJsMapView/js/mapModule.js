app.controller("mapController", function($scope){
$scope.locationsource = '';
$scope.locationdestination='';
	$scope.doSearch = function(){
	
		if($scope.locationsource === ''){
			alert('Please Enter Source');
		}else if($scope.locationdestination === ''){
				alert('Please Enter Destination');
		}else {
			alert('Source: '+$scope.locationsource	+'Destination: '+$scope.locationdestination);
        }
		
	};
});
		
		
		
		
		
		
