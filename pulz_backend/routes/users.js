var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pulz',
});

router.post('/', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  connection.query(

    "SELECT * FROM businesses WHERE email = ? AND password = ?",
    [email, password], function(err, row, field) {

      if (err) {

        console.log(err);
        res.send( {'success': false, 'message': 'There was an error logging in'} );

      }

      if (row.length > 0) {

        var id = row[0].b_ID;
        var stringID = id.toString();

        res.send( {'success': true, 'user': stringID } );

      } else {

        res.send( {'success': false, 'message': 'User not found'} );

      }

    }
  );

});

module.exports = router;
