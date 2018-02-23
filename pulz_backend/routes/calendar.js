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

  var emp = req.body.emp;
  var month = req.body.month;

  //********used for slicing date and getting an int as the month
  /*var slices = sentDate.split("-");
  console.log('4');
  var month = parseInt(slices[1], 10);
  console.log('5');
  */



  connection.query(
    "SELECT * FROM appointments WHERE b_ID = ? AND MONTH(date) = ?", [emp, month], function(err, row, field) {

      if(err) {

        console.log(err);
        res.send( {'success': false, 'message': "There was an error"} );

      } else {

        console.log(row);
        res.send( {'success': true, 'message': row });

      }

  });

  //res.send( {'success': true, 'message': sentDate });

});



router.post('/addEvent', function(req, res, next) {
  console.log("addevent");
  var emp = req.body.emp;
  console.log(emp);
  var sentDate = req.body.theDate;
  console.log(sentDate);

  res.send( {'success': true, 'message': "Successfully called addEvent route"} );

});

module.exports = router;
