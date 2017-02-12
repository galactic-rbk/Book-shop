var Book = require('./models/book.js');
var User = require('./models/userModel.js');
var jwt = require('jwt-simple');


module.exports.handleUsers = {
  signin : function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .then(function (user) {
        if (!user) {
          res.json("user not found")
        } else {
          user.comparePasswords(password)
            .then(function (isMatch) {
              if (isMatch) {
                var token = jwt.encode(user, 'secret');
                res.json({token : token});
              } else {
                res.json("password not matched")
              }
            });
        }
      });
  },

  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;

    // check to see if user already exists
    User.findOne({username: username})
      .exec(function (err, user) {
        if (user) {
          res.json('User already exist!');
        } else {
          // make a new user if not one
          return User.create({
            username: username,
            password: password,
            name: name
          }, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');
                res.json({token: token}); 
              }     
          });
        }
      });
  },

  getUsers: function(req, res) {
    User.find({}, function(err, users){
      if(err){
        res.json(err);
      } else {
        res.json(users);
      }
    });
  }

}


module.exports.handelBook = {

	showbook: function(req, res)  {
		Book.getBooks(function(err, books)  {
			if(err){
				throw err;
			}
			res.json(books);
		});
	},

	addbook : function(req, res)  {
		var book = req.body;
		Book.addBook(book,function (err, book) {
			if(err){
				throw err;
			}
			res.json(book);
		});
	}

}