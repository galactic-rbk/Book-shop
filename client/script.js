// Code goes here

angular.module('myApp', ['ngMaterial', 'jkAngularRatingStars'])

.controller('MyCtrl', function($scope) {
    $scope.firstRate = 0;
    $scope.readOnly = true;
});

function rate(rate){
  var rating =rate;
}