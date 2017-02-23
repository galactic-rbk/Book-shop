var mongoose = require('mongoose');
// use schema to add it to mongo data base
var ratingSchema = new mongoose.Schema({
  rate: {
    type: Number
  },
  PostedBy:{
    type:object.id, ref:'user'
  },
  BookId:{
    type:object.id, ref:'Book'
  }
});

module.exports = mongoose.model('rating', UserSchema);
