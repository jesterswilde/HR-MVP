var db = require('./config');

var noteSchema = db.mongoose.Schema({
  url: {type: String, index: true},
  note: String,
  top: Number,
  left: Number, 
  channel: String, 
  jQ: {}
});

var Note = db.mongoose.model('note', noteSchema); 

module.exports = Note; 
