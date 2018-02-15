const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

console.log('in koala router');

router.get('/', function(req, res){
    console.log('in koala get router');
    const sqlText = `SELECT * FROM koala ORDER BY id asc`;
pool.query(sqlText)
.then(function (result){
    console.log('got result', result.rows);
res.send(result.rows);
})
.catch(function(error){
    console.log('error on get in router', error);
    res.sendStatus(500);
})
})
// end get koala router
router.post('/', function(request, res){
    console.log(request.body);
    const koala = request.body;
    console.log(koala);
    
    const sqlText = `INSERT INTO koala
                        (name, age, gender, ready_for_transfer, notes)
                        VALUES ($1, $2, $3, $4, $5)`;
        pool.query(sqlText, [koala.name, koala.age, koala.gender, koala.readyForTransfer, koala.notes])
        .then(function(){
            console.log('added Koala', result);
            response.sendStatus(200)
        })
        .catch(function(error){
            console.log('error adding koala', error);
        })
    
})//end koala post













module.exports = router;