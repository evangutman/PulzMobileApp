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

  var name = req.body.name;
  var emp = req.body.emp;
//(SELECT b_ID FROM businesses WHERE email = ?)
  connection.query(

    "INSERT INTO employees (b_ID, name) VALUE (?, ?)",
    [emp, name], function(err, row, field) {

      console.log(emp);
      if (err) {

        if (err.errno == 1062){
          console.log(err);
          res.send( {'success': false, 'message': "User already exists"} );
        } else {

        console.log(err);
        res.send( {'success': false, 'message': "There was error"} );
        }
      } else {

        res.send( {'success': true, 'message': "Successfully added an employee"} );

      }
    }
  );
});

router.post('/list', function(req, res, next) {
  var user = req.body.emp;
  console.log("the user is:" + user);
  connection.query(
      "SELECT * FROM employees WHERE b_ID = ? ORDER BY name",
      [user], function(err, row, field) {

        if(err) {

          console.log(err);
          res.send( {'success': false, 'message': "There was an error"} );

        } else {

          res.send( {'success': true, 'message': row })

        }

      }
  );
});

module.exports = router;
