

// Import các module cần thiết
const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const http = require('http');
const bodyParser = require('body-parser');
var mysql = require('mysql');


// CREATE CONNECTION
con = mysql.createConnection({
    host: "localhost",
    user: "quyen",
    password: "1234",
    database: "gymz"
});

const { generateCustomerCode, insertIntoTable } = require('./src/functions.js');


const shopData = require('./public/data/shop.json');

shopData.forEach(value=>{
    insertIntoTable("shopData", value);
})



// const fs = require('fs');
// const readline = require('readline');

// con.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the database!');
// });

// const rl = readline.createInterface({
//     input: fs.createReadStream('./public/data/shop.txt'),
//     output: process.stdout,
//     terminal: false
// });

// let id = 'IT0001';

// rl.on('line', (line) => {
//     con.query("SELECT ItemID FROM shopData ORDER BY ItemID DESC LIMIT 1",
//         function (err, result, fields) {
//             if (err) throw err;
//             var id;
//             if (!result[0]) {
//                 id = 'IT0001';
//             } else {
//                 id = generateCustomerCode(result[0].ItemId);
//             }
//             var data = {
//                 itemID: id,
//                 mainImg: line
//             }
//             insertIntoTable("shopData", data)
//         })
// });

// // rl.on('close', () => {
// //     con.end();
// // });
