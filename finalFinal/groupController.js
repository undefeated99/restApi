// const express = require('express');
// const router = express.Router();
// const r = require('rethinkdb')
// const Promise = require('bluebird')

// const bodyParser = require('body-parser');
// //router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// const connectionPromise = r.connect({localhost: "localhost", port: "28015"})
// let con;
// connectionPromise.then((connection)=>{
//     con = connection
// })


// // module.exports.evalQuery = (req, res, next) =>{
// //     if(Object.entries(req.query).length > 0){
// //         res.status(200).send("I have a query")
// //     }
// //     else{
// //         next()
// //     }
// // }


// module.exports.getAllGroups = (req, res)=>{
//     r.table('Groups').run(con)
//     .then((val) =>{
//         val.toArray()
//         .then((arr)=>{
//            res.status(200).send(arr)
//         })
//     })
// }


// module.exports.createGroup = (req, res) =>{
//     r.table("Groups").insert({gName: req.body.gName}).run(con)
//     .then((val)=>{
//         res.status(201).send("Successfully created!")
//     })
    
// }


