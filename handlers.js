var Book = require('./models/book.js');
var User = require('./models/userModel.js');
var jwt = require('jwt-simple');
var Order = require('./models/orderModel.js');

// check for user in data base
module.exports.handleUsers = {
  signin : function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .then(function (user) {
        if (!user) {
          res.status(404).json("user not found")
        } else {
          user.comparePasswords(password)
            .then(function (isMatch) {
              if (isMatch) {
                var token = jwt.encode(user, 'secret');
                res.json({token : token, user : user});
              } else {
                res.json("password not matched")
              }
            });
        }
      });
  },

  // add user to data base
  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;
    var phone = req.body.phone;
    var address = req.body.address;
    var emailAddress = req.body.emailAddress;


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
            userType: userType,
            phone: phone,
            address: address,
            emailAddress: emailAddress
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

  // get user in data base
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
  // get book from data base
	showbook: function(req, res)  {
		Book.getBooks(function(err, books)  {
			if(err){
				throw err;
			}
			res.json(books);
		});
	},

  // add book to data base
	addbook : function(req, res)  {
   console.log(req.body.price)
		var book = req.body;
		Book.addBook(book,function (err, book) {
			if(err){
				throw err;
			}
			res.json(book);
		});
	},
}

module.exports.handelOrder={
  showorder:function(req,res){
    Order.getOrders(function(err,orders){
      if (err) {
        throw err;
      }
      res.json(orders)
    })
  },

  addorder:function(req,res){
    console.log("sdfghjkl")
    console.log(req.body.data)
    var order = req.body.data
    Order.addOrder(order,function (err, order) {
      if(err){
        throw err;
      }
      res.json(order);
    });
  }
}