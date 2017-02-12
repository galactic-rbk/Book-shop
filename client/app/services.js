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
			data: book
		});
	};

	return {
		showbook: showbook,
		addbook: addbook
	};

})