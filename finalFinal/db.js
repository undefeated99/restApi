const r = require('rethinkdb')
const Promise = require('bluebird')

const connectionPromise = r.connect({localhost: "localhost", port: "28015"})
let con;
connectionPromise.then((connection)=>{
    con = connection
    createIndices();
})


const createIndices = () =>{
    r.table("Posts").indexList().run(con)
    .then(val => { 
        return Promise.all([
            r.table("Posts").indexCreate("uidGid", [r.row("uId"), r.row("gId")]).run(con),
            r.table("Posts").indexCreate("uId").run(con),
            r.table("Posts").indexCreate("gId").run(con)
        ])
    })
    .catch(() => {
        console.log("Existing indices cannot be created again...")
    })
}

