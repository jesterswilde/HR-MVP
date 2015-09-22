var mongoose = require('mongoose');

 var uristring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/shortly';


mongoose.connect(uristring, function(err, res) {
  if(err) console.log(err);
});


exports.mongoose = mongoose;