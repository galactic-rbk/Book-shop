angular.module('addbook' , [])

.controller('BookController', function ($scope , $window , $location , book) {
  $scope.book = {};
  $scope.buy=[];

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
    $scope.buy.push({title:title, price:price})
     console.log($scope.buy,price)
    }
    // console.log(price,array)
  $scope.cancel=function(title){
    for (var i = 0; i < $scope.buy.length; i++) {
      if($scope.buy[i]["title"]=title){
        $scope.buy.splice(i,1)
      }
    }
    console.log($scope.buy)

  }
  $scope.finish=function(){
    var sum=0
    for (var i = 0; i < $scope.buy.length; i++) {
      var price=$scope.buy[i]["price"]
      price=price.split(" ");
      price=Number(price[0])
      sum+=price
    }
    alert("tha amount is  " +sum +"  JD")
  }
  // function show book for user and admin
  $scope.showBook = function () {
  	book.showbook($scope.book).then(function(data) {
		$scope.book = data;
	});
  }

  });

