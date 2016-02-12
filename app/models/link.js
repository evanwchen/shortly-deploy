var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
  createdAt: Date,
  updatedAt: Date
});

var Link = mongoose.model('Link', urlSchema); // var url = new UrlModel();
// var Link = UrlModel;

urlSchema.pre('save', function(next){
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

urlSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5));
  next();
});

// UrlModel.findOne({ 'url': 'http://www.roflzoo.com/' }, 'url visits', function (err, person) {
//   if (err) console.log('err: ',err);
//   console.log('person: ',person); // Space Ghost is a talk show host.
// })

  // tableName: 'urlSchema',
  // hasTimestamps: true,

  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     var shasum = crypto.createHash('sha1');
  //     shasum.update(model.get('url'));
  //     model.set('code', shasum.digest('hex').slice(0, 5));
  //   });
  // }
// });

module.exports = Link;
