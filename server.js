<<<<<<< HEAD
var http = require('http');
var express = require('express');
=======
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;
db.once('open',function () {
		console.log('mongoDB is open');
	});

app.get('/', function(req, res)  {
	res.send('Please use /api/books ');
});


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



app.listen(3000);
console.log('Running on port 3000...');
>>>>>>> 676ce9c23cf49ce0f7a86043f433d28bc0928039
