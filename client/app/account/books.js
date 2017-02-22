angular.module('addbook' , [])

.controller('BookController', function ($scope , $window , $location , book , Order) {
  $scope.book = {};
  $scope.buy=[];

  if($location.path() === '/books/add' || $location.path() === '/links'){
  if(!$window.localStorage.getItem("user.type")) {
        $location.path('/');
      } 
  }

  // function add book just for admin 
  $scope.book.type="book"
  $scope.book.approved='true'
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

  $scope.updatebook = function (bk) {
    console.log(bk)
    book.updatebook(bk)
    .then(function (Book) {
        console.log(Book)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
   $scope.showBook = function () {
    book.showbook($scope.book).then(function(data) {
    $scope.book = data;
  });
  }

  /// turn image into buffer
  $scope.click=false
  $scope.imagetext=""
  $scope.reader=new FileReader();
  $scope.loading=false;
  $scope.previewFile=function(){
    $scope.loading=true;
    $scope.$apply();
    if ($scope.image_url===undefined || Object.keys($scope.image_url).length){
      $scope.book.image_url=$scope.imagetext
      $scope.$apply()
    }else{
      $scope.reader.readAsDataURL($scope.image_url); //reads the data as a URL
      setTimeout(function(){
        $scope.book.image_url=$scope.reader.result;
        $scope.$apply()
      },500);
    }
    $scope.loading=false;
  }

  //upload book
 
  $scope.file={}
  $scope.filetext="";
  $scope.readfile=new FileReader();
  $scope.prosFile=function(){
    $scope.book.approved='false'
    $scope.loading=true;
    $scope.$apply()
    if ($scope.filetext!==""){
      $scope.book.type="link"
      //$scope.book.title="link"
      $scope.book.link=$scope.filetext
    }else{
      $scope.readfile.readAsDataURL($scope.file); //reads the data as a URL
      setTimeout(function(){
        $scope.book.link=$scope.readfile.result;
        $scope.book.type="link"
        $scope.$apply()
        //console.log($scope.readfile.result)
        },1000);
      }
      $scope.loading=false;
    }
 
  // if($location.path() === "/upload"){
  //   alert('hey')
  // }
$scope.booktab=function(link){
  window.open(link,"_blank")
}


  // function to add book to the cart
  $scope.Buy=function(title,price,image_url){
     if($window.localStorage.getItem("user.book")){
      var user=$window.localStorage.getItem("user.book")
    $scope.buy.push({user:user,title:title, price:price,image_url:image_url})
     console.log($scope.buy,price)
     console.log($scope.book)
     
    }
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
      if($scope.buy[i]["title"]===title){
        $scope.buy.splice(i,1)
        $scope.cancel(title)
      }
    }// console.log($scope.buy)
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
