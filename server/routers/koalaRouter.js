const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

console.log('in koala router');

router.get('/', function(request, response){
    console.log('in koala get router');
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
})
// end get koala router
router.post('/', function(request, response){
    console.log(request.body);
    const koala = request.body;
    console.log(koala);
    
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
})

router.put('/', function(request, response){
    const id = request.body.data;
    const sqlText = `UPDATE koala SET ready_for_transfer = 'Yes' WHERE id = ${id}`;
    console.log('sqlText');
    
    pool.query(sqlText)
    .then (function(result){
        console.log('updated', id);
        response.sendStatus(200);
    })
    .catch(function(error){
        console.log('error on update', error);
        response.sendStatus(500);
    })
})









module.exports = router;