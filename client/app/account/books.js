angular.module('addbook' , [])

.controller('BookController', function ($scope , $window , $location , book) {
  $scope.book = {};
  $scope.buy={"id":false};

  // if($location.path() === '/books/add'){
  // if(!$window.localStorage.getItem("user.type")) {
  //       $location.path('/');
  //     } 
  // }
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
  // function to add book to the cart
  $scope.Buy=function(title,price){
    $scope.buy['id']=true
    $scope.buy[title]={title:price}
     console.log($scope.buy,price)
    }
    // console.log(price,array)
  $scope.cancel=function(title){
    delete $scope.buy[title]
    console.log($scope.buy)

  }
  // $scope.result=function(){
  //   $scope.bookBuy=$scope.buy
  //   $scope.book

  // }
  // function show book for user and admin
  $scope.showBook = function () {
  	book.showbook($scope.book).then(function(data) {
		$scope.book = data;
	});
  }

  });

