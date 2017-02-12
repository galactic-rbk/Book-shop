angular.module('book.auth',
  'book.main',
  'book.services'
	,[])
.config(function($routeProvider, $httpProvider){
	.when('/signup', {
      templateUrl: 'app/account/signin.html',
      controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })     
	.when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .otherwise({redirectTo:'/'});
})