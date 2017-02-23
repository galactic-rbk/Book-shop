angular.module('book.services', [])

// get all book
.factory('book', function ($http) {
	var showbook = function () {
		return $http({
			method: 'GET',
			url: '/api/books'
		})
		.then(function (res) {
			return res.data;
		});
	};

  // "post" add book
	var addbook = function (book) {
		return $http({
			method: 'POST',
			url: '/api/books',
			data: book 
		}).then(function (res) {
			return res;
		});
	};

  var updatebook = function (book) {
    console.log(book)
    return $http({
      method: 'POST',
      url: '/api/update',
      data: book 
    }).then(function (res) {
      return res;
    });
  };

	return {
		showbook: showbook,
		addbook: addbook,
    updatebook : updatebook
	};

})

.factory('Order',function($http){
  var showorder=function(){
    return $http({
      method:'GET',
      url:'/api/orders'
    })
    .then(function(res){
      return res.data
    });
  };


 var addorder = function (order) {
  console.log(order)
    return $http({
      method: 'POST',
      url: '/api/orders',
      data: order
    }).then(function (res) {
      return res;
    });
  };

  return {
    showorder:showorder,
    addorder:addorder
  }

})

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };          

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.book');
    $window.localStorage.removeItem('user.book');
    $window.localStorage.removeItem('user.type');
    $location.path('/signin');
    $window.location.reload();
  };

  return {
    signin: signin,
    signup: signup,
    signout:signout
  };
});
