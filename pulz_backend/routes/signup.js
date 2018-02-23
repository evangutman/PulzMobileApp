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
  var bname = req.body.bname;
  var name = req.body.name;

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

module.exports = router;
