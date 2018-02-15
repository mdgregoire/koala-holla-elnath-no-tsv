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














module.exports = router;