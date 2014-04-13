	app.controller('MainController', function($scope, CalculatorService) {
    $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    }
    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube($scope.number);
    }
});