var app = angular.module('MyTutorialApp', []);

//create a service
app.service('MathService', function() {
    this.multiply = function(a, b) {
		return a * b 
	};
});

//create another service and usage of MathService
app.service('CalculatorService', function(MathService){
    this.square = function(a) {
			return MathService.multiply(a,a); 
	};
    this.cube = function(a) { 
			return MathService.multiply(a, MathService.multiply(a,a));
	};
});