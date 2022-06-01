(async ()=>{
// get the client
const mysql = require('mysql2');
// create the pool
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'smartphones'});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// query database using promises
const [rows] = await promisePool.query("SELECT * FROM users");
console.log({rows})

})()