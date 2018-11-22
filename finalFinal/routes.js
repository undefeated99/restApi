const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.status(200).send("Heeeeyyyy!!!! :D")
});

const groupController = require('./groupController');
const userController = require('./userController')

// router.route('/groups')
//     //.get(groupController.evalQuery, groupController.getAllGroups)
//     .get(groupController.getAllGroups)
//     .post(groupController.createGroup)  

router.route('/users')
    .get(userController.getAllUsers)
    .post(userController.addUser)
    .delete(userController.deleteAllUsers)

router.route('/users/:uId')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/users/:uId/groups')
    .get(userController.getAllGroupsOfUser)  
    .post(userController.addGroupToUser) 
    .delete(userController.deleteAllGroupsOfUser)  

router.route('/users/:uId/groups/:gId')
    .get(userController.getGroupOfUserById) 
    .delete(userController.deleteGroupOfUserById) 

router.route('/users/:uId/groups/:gId/posts')  
    .get(userController.getAllPostsOfUserFromGroup)  
    .post(userController.addPostToUserFromGroup)  
    .delete(userController.deleteAllPostsOfUserFromGroup) 

router.route('/users/:uId/groups/:gId/posts/:pId')
    .get(userController.getPostOfUserFromGroupById)
    .put(userController.updatePostOfUserFromGroupById)
    .delete(userController.deletePostOfUserFromGroupById)
  

     

module.exports = router;