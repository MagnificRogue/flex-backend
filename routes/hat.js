var express = require('express');
var router = express.Router();
var connection = require('../db');
var mysql = require('mysql');

// create the mysql connection

/* GET hats listing. */
router.get('/', function(req, res) {
  
  var sql = "SELECT * FROM hats";

  connection.query(sql, function(err, results){
    if (err){
      throw err; 
    } 
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });

});

/* GET single hat by id */
router.get('/:id', function(req,res){
  var sql = "SELECT * FROM hats WHERE id=?";
  var insert = [req.params.id];

  connection.query(mysql.format(sql,insert), function(err, results){
    if (err){
      throw err;    
    } 

    if(results.length === 0){
      res.status(404);    
    } 
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results[0]));

  });

});

/* POST a hat to the data store  */
router.post('/', function(req,res){
  
  var sql = "INSERT INTO hats ( `name`, `description`) VALUES (?,?)";
  var insert = [req.body.name, req.body.description];
  
  connection.query(mysql.format(sql,insert), function(err, results){
    if (err) {
      throw err; 
    } 
 
    res.status(201);
    
    
  res.send('OK');

  });

});

/* PUT an update to a hat in our data store */
router.put('/:id',function(req,res){
 
  var sql = "UPDATE hats SET name = ?, description=? WHERE id=?";
  var insert = [req.body.name, req.body.description, req.params.id];

  connection.query(mysql.format(sql,insert), function(err, results){
    if (err) {
      throw err; 
    } 

    res.status(204);
    res.send();
  });

});

/* DELETE a hat from our data store */
router.delete('/:id', function(req,res){
  
  var sql = "DELETE FROM hats WHERE id=?";
  var insert = [req.params.id];


  connection.query(mysql.format(sql,insert), function(err, results){
    if (err) {
      throw err; 
    } 

    res.status(204);
    res.send();
  });

});

module.exports = router;
