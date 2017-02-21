angular.module('addbook' , [])

.controller('BookController', function ($scope , $window , $location , book , Order) {
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
  
  // function show book for user and admin
  $scope.showBook = function () {
  	book.showbook($scope.book).then(function(data) {
      console.log('imm hereee')
		$scope.book = data;
	});
  }
  // function to add book to the cart
  $scope.Buy=function(title,price,image_url){
    $scope.buy.push({title:title, price:price,image_url:image_url})
     console.log($scope.buy,price)
     console.log($scope.book)
     
    }
    $scope.add=function(x){
        console.log(x)
       Order.addorder({data:x}).then(function(resp){
        console.log(resp)
       })
    }
    // console.log(price,array)
  $scope.cancel=function(title){
    for (var i = 0; i < $scope.buy.length; i++) {
      if($scope.buy[i]["title"]=title){
        $scope.buy.splice(i,1)
        $scope.cancel(title)
      }
    }
    // console.log($scope.buy)
  }
  $scope.finish=function() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    $scope.sum=0
    for (var i = 0; i < $scope.buy.length; i++) {
      var price=$scope.buy[i]["price"]
      price=price.split(" ");
      price=Number(price[0])
      $scope.sum+=price
    }
  }
});

