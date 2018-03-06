/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/25/18
---------------
----------------
--Date Last Modified:
--03/6/18
----------------
----------------
--Version:
--Alpha 1.0
----------------
TODO: handle repeat appointments**
*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var moment = require('moment');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pulz',
});

//route for adding event to calendar
router.post('/add', function(req, res, next) {

  console.log("addevent");
  var emp = req.body.emp;
  console.log(emp);
  var sentDate = req.body.theDate;
  console.log(sentDate);

  res.send( {'success': true, 'message': "Successfully called addEvent route"} );
});


router.post('/', function(req, res, next) {

  var emp = req.body.emp;
  var month = req.body.month;
  var year = req.body.year;



  //********used for slicing date and getting an int as the month
  /*var slices = sentDate.split("-");
  console.log('4');
  var month = parseInt(slices[1], 10);
  console.log('5');
  */



  connection.query(
/*
    "SELECT *\
    FROM (SELECT *\
          FROM (SELECT *\
                FROM appointments\
                WHERE b_ID = ?\
                AND repeat_ID IS NOT NULL) AS business\
          INNER JOIN repeatAppointments AS repeats\
          ON repeats.ra_ID = business.repeat_ID\
          WHERE YEAR(endDate) > ?\
          OR MONTH(endDate) >= ?) AS repeats, appointments AS apts\
    WHERE apts.b_ID = ?\
    AND MONTH(apts.date) = ?", [emp, year, month, emp, month], function(err, row, field) {
*/
/*
  "SELECT *\
  FROM (SELECT *\
        FROM (SELECT *\
              FROM repeatAppointments\
              WHERE YEAR(endDate) > ?\
              OR MONTH(endDate) >= ?) AS repeats\
        INNER JOIN appointments\
        ON repeats.ra_ID = appointments.repeat_ID) AS rep\
  RIGHT JOIN appointments\
  ON rep.b_ID = appointments.b_ID\
  WHERE appointments.b_ID = ?\
  AND MONTH(appointments.date) = ?", [year, month, emp, month], function(err, row, field) {
*/



  "SELECT *\
  FROM repeatAppointments\
  INNER JOIN appointments\
  ON repeatAppointments.ra_ID = appointments.repeat_ID\
  WHERE (appointments.b_ID = ?)\
  AND (YEAR(repeatAppointments.endDate) > ? OR MONTH(repeatAppointments.endDate) >= ?)\
  UNION\
  SELECT *\
  FROM appointments\
  WHERE appointments.b_ID = ?\
  AND MONTH(appointments.date) = ?", [emp, year, month, emp, month], function(err, row, field) {



//need to calculate weekly and biweekly dates




      console.log(row);

      if(err) {
        console.log(err);
        res.send( {'success': false, 'message': "There was an error"} );
      } else {
        //console.log(row);
        res.send( {'success': true, 'message': row });
      }
  });
  //res.send( {'success': true, 'message': sentDate });
});

module.exports = router;
