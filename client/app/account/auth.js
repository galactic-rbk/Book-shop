angular.module('book.auth', [])

.controller('AuthController', function ($scope , $window , $location , Auth) {
  $scope.user = {};
     if($window.localStorage.getItem("com.book")) {
        $location.path('/');
      } 

  $scope.signin = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      Auth.signin($scope.user)
      .then(function (token) {
        console.log(token)
        $window.localStorage.setItem('com.book', token);
        $window.localStorage.setItem('user.book', $scope.user.username);
        // if(data.userType === 'admin'){}
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      if(!userFlag && !passFlag){
        $scope.msg = "Wrong input for user or Password  "
      } else if(!userFlag){
        $scope.msg = "please inter your username"
      } else if (!passFlag){
        $scope.msg = "please inter your password"
      }
    }
  }


  $scope.signup = function () {
    var passFlag = $scope.user.password;
    var userFlag = $scope.user.username;
    if(userFlag && passFlag){
      Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.book', token);
        $window.localStorage.setItem('user.book', $scope.user.username);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
    } else {
      if(!userFlag && !passFlag){
       $scope.msg = "Wrong input for user or Password"
     } else if(!userFlag){
      $scope.msg = "please inter all fild"
    } else if (!passFlag){
      $scope.msg = "please inter all fild"
    }
  }
}

$scope.signout = function(){
  Auth.signout();
}
$scope.contactus = function ($scope, $http){
  $scope.success = false;
  $scope.error = false;
  $scope.send = function () {

  var htmlBody = '<div>Name: ' + $scope.user.name + '</div>' +
                 '<div>Email: ' + $scope.user.email + '</div>' +
                 '<div>Message: ' + $scope.user.body + '</div>' +
                 '<div>Date: ' + (new Date()).toString() + '</div>';
  
    $http({
      url: 'http://localhost:3000/#/contactus.html',
      method: 'POST',
      data: {
        'From': '',
        'To': 'eng.m.enjari@gmail.com',
        'HtmlBody': htmlBody,
        'Subject': 'New Contact Form Submission'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': '8569dcd45-6a1a-4e7b-ae75-ea37629de4'
      }
    }).
    success(function (data) {
      $scope.success = true;
      $scope.user = {};
    }).
    error(function (data) {
      $scope.error = true;
    });
  }
}


});
