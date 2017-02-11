const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');

var handlers = require('./handlers.js')
var Book = require('./models/book');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());


// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bookstore');
var db = mongoose.connection;

// db.once('open',function () {
// 		console.log('mongoDB is open');
// 	});

// app.get('/', function(req, res)  {
// 	res.send('Please use /api/books');
// });


app.get('/api/books', function(req, res)  {
	Book.getBooks(function(err, books)  {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.post('/api/books', function(req, res)  {
	var book = req.body;
	Book.addBook(book,function (err, book) {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/users/signup', );
app.post('/api/users/signin', );


app.get('/api/users', );
app.get('/api/users/:user', );




app.listen(process.env.PORT || 3000);
console.log('Running on port 3000...');

module.exports = app;