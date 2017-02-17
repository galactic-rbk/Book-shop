angular.module('addbook' , [])

.controller('BookController', function ($scope , $window , $location , book) {
  $scope.book = {};

  if($location.path() === '/books/add'){
  if(!$window.localStorage.getItem("user.type")) {
        $location.path('/');
      } 
  }
  // function add book just for admin 
  $scope.addbook = function () {
  	book.addbook($scope.book)
  	.then(function (Book) {
        console.log(Book)
        $location.path('/books');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function show book for user and admin
  $scope.showBook = function () {
  	book.showbook($scope.book).then(function(data) {
		$scope.book = data;
	});
  }

  });

