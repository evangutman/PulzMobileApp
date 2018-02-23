var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pulz'
});

router.post('/addClient', function(req, res, next) {
  var name = req.body.name;
  var address = req.body.address;
  var emp = req.body.emp;

  console.log(name);

  connection.query(
    "INSERT INTO clients (b_ID, name, address) VALUE (?,?,?)",
    [emp, name, address], function(err, row, field){

      if (err) {

        console.log(err);
        res.send( {'success': false, 'message': 'There was an error logging in'} );

      } else {

        res.send( {'success': true, 'message': "Successfully added an employee"} );

      }


    }
  );
});

router.post('/', function(req, res, next) {

  var user = req.body.emp;


  connection.query(
      "SELECT * FROM clients WHERE b_ID = ?",
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
