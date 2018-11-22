const express = require('express');
const router = express.Router();
const r = require('rethinkdb')
const Promise = require('bluebird')

const bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const connectionPromise = r.connect({localhost: "localhost", port: "28015"})
let con;
connectionPromise.then((connection)=>{
    con = connection
})



module.exports.getAllUsers = (req, res)=>{    
    r.table('Users').run(con)
    .then((val) =>{
        val.toArray()
        .then((arr)=>{
           res.status(200).send(arr)
        })
    }) 
}


module.exports.getAllGroupsOfUser = (req, res)=>{   
    r.table('Users').get(req.params.uId)("groups").map( element => {
    	return r.table("Groups").get(element)
	})
  .run(con)
    .then((val) =>{
        val.toArray()
        .then((arr)=>{
           res.status(200).send(arr)
        })
    })
}


module.exports.getAllPostsOfUserFromGroup = (req, res)=>{  

    r.table("Posts").getAll([req.params.uId, req.params.gId], {index: "uidGid"})
    .run(con)
    .then((val) =>{   
        val.toArray()
        .then((arr) =>{
            res.status(200).send(arr)
        }) 
        
    }) 
}


module.exports.getUserById = (req, res)=>{
    r.table('Users').get(req.params.uId).run(con)
    .then((val) =>{    
        res.status(200).send(val)
    })
    .catch(()=>{
        res.status(404).send("Request doesn't exist.")
    })
}

module.exports.getGroupOfUserById = (req, res)=>{  
    r.table("Groups").get(req.params.gId)
    .run(con)
    .then((val) =>{    
        res.status(200).send(val)
    }) 
}


module.exports.getPostOfUserFromGroupById = (req, res)=>{  
    r.table('Posts').get(req.params.pId)
    .run(con)
    .then((val) =>{    
        res.status(200).send(val)
    }) 
}


module.exports.addUser = (req, res) =>{
    r.table("Users").insert({
        "uName": req.body.uName,
        "groups": []
    }).run(con)
    .then((val)=>{
        res.status(201).send(val)
    })
    
}


module.exports.addGroupToUser = (req, res)=>{  
    r.table('Users').get(req.params.uId).update({         
        groups: r.row("groups").add([req.body.gId])
    }).run(con)
    .then((val) =>{    
        res.status(201).send(val)
    }) 
}


module.exports.addPostToUserFromGroup = (req, res)=>{  
r.table('Posts').insert({
    uId: req.params.uId,
    gId: req.params.gId,
    content: req.body.content
})
.run(con)
    .then((val) =>{    
        res.status(201).send(val)
    }) 
}


module.exports.updateUserById = (req, res)=>{   
    r.table('Users').update(req.body).run(con)
    .then((val) =>{    
        res.status(201).send(val)
    }) 
}


module.exports.updatePostOfUserFromGroupById = (req, res)=>{   
    r.table('Posts').get(req.params.pId).update(req.body).run(con)
    .then((val) =>{    
        res.status(204).send(val)
    }) 
}


module.exports.deleteAllUsers = (req, res)=>{   
    Promise.all([
        r.table("Users").delete().run(con),
        r.table("Posts").delete().run(con)
    ])
    .then((val) =>{    
        res.status(204).send()
    }) 
}


module.exports.deleteAllGroupsOfUser = (req, res)=>{   
    Promise.all([
        r.table("Posts").getAll(req.params.uId, {index: "uId"}).delete().run(con),
        r.table("Users").get(req.params.uId).update({groups: []}).run(con)
    ]) 
    .then((val) =>{    
        res.status(204).send()
    }) 
}


module.exports.deleteAllPostsOfUserFromGroup = (req, res)=>{   
    r.table("Posts").getAll([req.params.uId, req.params.gId], {index: "uidGid"}).delete().run(con)
    .then((val) =>{    
        res.status(204).send()
    }) 
}

module.exports.deleteUserById = (req, res)=>{   
    Promise.all([
        r.table('Users').get(req.params.uId).delete().run(con),
        r.table('Posts').getAll(req.params.uId, {index: "uId"}).delete().run(con)
    ])
    .then((val) =>{    
        res.status(204).send()
    }) 
}

module.exports.deleteGroupOfUserById = (req, res)=>{   
    r.table("Users").get(req.params.uId).getField("groups").run(con)
    .then((groupArr)=>{
        let index = -1;      
        index = groupArr.indexOf(req.params.gId)
        if(index > -1){
            return Promise.all([
                r.table('Users').get(req.params.uId).update({groups: r.row("groups").deleteAt(index)}).run(con),
                r.table('Posts').getAll(req.params.gId, {index: "gId"}).delete().run(con)
            ])  
        }
    })
    .then((val) =>{    
        res.status(204).send()
    })
    .catch((err)=>{console.log(err)}) 
}

module.exports.deletePostOfUserFromGroupById = (req, res)=>{   
    r.table("Posts").get(req.params.pId).delete().run(con)
    .then((val) =>{    
        res.status(204).send()
    })
    .catch((err)=>{console.log(err)}) 
}




