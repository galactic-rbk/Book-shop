angular.module('addorder' , [])

.controller('OrderController', function ($scope , $window , $location , Order) {
	 $scope.order = {};
	 $scope.showOrder=function(){
	 	// console.log(Order)
	 	Order.showorder($scope.order).then(function(data){
	 		$scope.order=data;
	 		console.log(data)
	 	})
	 }
	 // showconsole.log($scope.buy)
})