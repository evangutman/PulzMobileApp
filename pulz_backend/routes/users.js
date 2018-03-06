/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/1/18
---------------
----------------
--Date Last Modified:
--03/6/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

TODO: Be sure to salt and hash password*****
*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pulz',
});


//route to add new user
router.post('/add', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  var bname = req.body.bname;
  var name = req.body.name;
  console.log("entered user/add");

  connection.query(

    "INSERT INTO businesses (password, bname, name, email) VALUE (?,?,?,?)",
    [password,bname, name, email], function(err, row, field) {

        if (err) {
          if (err.errno == 1062){
            console.log(err);
            res.send( {'success': false, 'message': "User already exists"} );
          }
          console.log(err);
          res.send( {'success': false, 'message': "There was error"} );
        } else {
          res.send( {'success': true, 'user': email} );
        }
    }
  );
});

//route to sign in
router.post('/', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  console.log("entered users/");

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
