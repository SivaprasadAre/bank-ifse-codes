var User = require('./user');

exports.get = function (req, res) {
  var perPage = 1000;
  var page = req.query.paging || 1;

  User.find({}, function (err, documents) {
    if (err) {
      res.send("error.....!");
    } else {
      User.count({}, function (err, count) {

        res.render('home', {
          drinks: documents,
          current: page,
          pages: Math.ceil(count / perPage),
          uplodeBuiten: false
        });
      });
    }
  }).skip((perPage * page) - perPage).limit(perPage);
};
exports.create = function (req, res) {
  var data = req.body;
  console.log(data);
  User.create(data, function (err, documents) {
    console.log(err, documents);
    if (err) {
      res.send("Recored error.....!");
    } else {
      res.render('home', {
        drinks: documents,
        current: 1,
        pages: 0,
        uplodeBuiten: false
      });
    }
  });
};
