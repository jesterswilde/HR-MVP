var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser'); 
var app = express();
var noteModel = require('./db/sticky.js');


app.use(bodyParser.urlencoded({extended: true}));

app.get('/page', function(req,res){
  console.log("page"); 
  console.log(req.query.channel); 
  noteModel.find({url: req.query.hash, channel: req.query.channel},'top left url note channel',function(err, theNotes){
    if(err){
      console.log("error"); 
      res.send(err);
    }
    else{
      console.log("found"); 
      console.log(theNotes); 
      res.send(theNotes); 
    }
  }); 
}); 
app.post('/page', function(req,res){
  console.log(req.body); 
  console.log(req.query.hash); 
  postNotes(res, req, req.query.hash);
  res.send(200); 
});
app.post('/remove', function(req,res){
  removeNote(res, req, req.query.hash);
});
app.get('/*', function(req,res){
  res.send(200); 
});
var removeNote =  function(res,req,hashedUrl){
  var notes = req.body;
  notes.url = hashedUrl;
  notes.top = Number(notes.top); 
  notes.left = Number(notes.left);  
  noteModel.find(notes).remove().exec(); 
};

var postNotes = function(res,req,hashedUrl){
  var notes = req.body;
  console.log(notes.channel); 
  console.log("posting notes"); 
  for(var key in notes){
    var pos = key.split('-'); 
    var stickyObject = {top: pos[0], left: pos[1], url: hashedUrl, channel: notes.channel};
    var stickyObjectWValue = {top: pos[0], left: pos[1], url: hashedUrl, note: notes[key].text, channel: notes.channel};
    noteModel.update(stickyObject, stickyObjectWValue,{upsert: true}, function(err, foundNote){
      noteModel.findOne(stickyObject,'top left url note channel', function(err, foundOneNoe){
        console.log(foundOneNoe); 
      });
    });
  }
};

module.exports = app;
