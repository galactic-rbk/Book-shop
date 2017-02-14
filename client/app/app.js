angular.module('books',
  ['book.auth',
  'book.main',
  'book.services',
  'ngRoute'
	])
.config(function($routeProvider, $httpProvider){
  $routeProvider
	.when('/signup', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/account/signin.html',
      controller: 'AuthController'
    })     
  .when('/signout', {
      templateUrl: 'app/account/signout.html',
      controller: 'AuthController'
    })
	.when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
  .when('/books/add',{
    templateUrl: 'app/account/add_book.html',
    controller:'BooksController'
  })
  .when('/books',{
    templateUrl:'app/account/showbooks.html',
    controller:'BooksController'
  })
    .otherwise({redirectTo:'/'});
})