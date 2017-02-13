angular.module('book.services', [])

.factory('book', function ($http) {
	var showbook = function () {
		return $http({
			method: 'GET',
			url: '/api/books'
		})
		.then(function (resp) {
			return resp.data;
		});
	};

	var addbook = function (book) {
		return $http({
			method: 'POST',
			url: '/api/books',
			data: JSON.stringify({book : book})
		}).then(function (resp) {
			return resp;
		});
	};

	return {
		showbook: showbook,
		addbook: addbook
	};

})

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
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
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    signout:signout
  };
});
