// const express = require('express');
// const router = express.Router();
// const r = require('rethinkdb')
// const Promise = require('bluebird')

// const bodyParser = require('body-parser');
// //router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
// const connection = r.connect({localhost: "localhost", port: "28015"})



// router.get('/', (req, res) => {
//     res.status(200).send("Orayt...")
// });


// router.post('/', (req, res) =>{
//     connection.then((con) =>{
//         r.table("Posts").insert({
//             content: req.body.content
//         }).run(con) 
//         con.close()
//     })
//     .then(() =>{

//         res.status(201).send("Successfully Created!!!")
//     })
// })




// module.exports = router;