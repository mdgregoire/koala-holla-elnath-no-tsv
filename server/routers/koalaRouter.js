const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

console.log('in koala router');

router.get('/', function(request, response){
  const sqlText = `SELECT * FROM koala ORDER BY id asc`;
  pool.query(sqlText)
  .then(function (result){
    console.log('got result', result.rows);
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error on get in router', error);
    response.sendStatus(500);
  })
})// end get koala router

router.post('/', function(request, response){
  const koala = request.body;
  const sqlText = `INSERT INTO koala
                    (name, age, gender, ready_for_transfer, notes)
                    VALUES ($1, $2, $3, $4, $5)`;
  pool.query(sqlText, [koala.name, koala.age, koala.gender, koala.readyForTransfer, koala.notes])
  .then(function(result){
    console.log('added Koala', result);
    response.sendStatus(200)
  })
  .catch(function(error){
    console.log('error adding koala', error);
  })
})//end koala post

router.delete('/', function(request, response){
  const id = request.body.data;
  const sqlText = `DELETE FROM koala WHERE id = ${id}`;
  pool.query(sqlText)
  .then (function(result){
    console.log('deleted', id);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on delete', error);
    response.sendStatus(500);
  })
})//end koala delete

router.put('/', function(request, response){
  const id = request.body.data;
  const sqlText = `UPDATE koala SET ready_for_transfer = 'Yes' WHERE id = ${id}`;
  pool.query(sqlText)
  .then (function(result){
    console.log('updated', id);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on update', error);
    response.sendStatus(500);
  })
})//end koala put

router.post('/editPost', function(request, response){
  console.log(request.body.id, 'in editpost');
  const idToEdit = request.body.id;
  sqlText = `SELECT * FROM koala WHERE id = ${idToEdit}`;
  pool.query(sqlText)
  .then(function(result){
    console.log('success in edit post');
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error in edit post');
    response.sendStatus(500);
  })
})//end post edit router

router.put('/editSubmit', function(request, response){
  const editedKoala = request.body;
  console.log(editedKoala, 'ineditsubmit');
  const sqlText = `UPDATE koala
                   SET name = '${editedKoala.name}', age = '${editedKoala.age}',
                   gender = '${editedKoala.gender}', ready_for_transfer = '${editedKoala.ready_for_transfer}',
                   notes = '${editedKoala.notes}'
                   WHERE id = ${editedKoala.id}`;
                   console.log(sqlText, 'ineditsubmit');
  pool.query(sqlText)
  .then(function(result){
    console.log('success in editput');
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error in editput');
  })
})//end put edit

router.get('/toggle', function(request, response){
  const sqlText = `SELECT * FROM koala WHERE ready_for_transfer = 'Yes' ORDER BY id asc`;
  pool.query(sqlText)
  .then(function (result){
    console.log('got toggle result', result.rows);
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error on toggle in router', error);
    response.sendStatus(500);
  })
})// end get koala toggle router

module.exports = router;
