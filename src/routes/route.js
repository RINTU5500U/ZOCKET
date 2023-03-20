const express = require("express")
const router = express.Router()

const {createUser, login, fetchUser, fetchUserBySearch, fetchUserById, updateUser, deleteUser} = require('../controllers/userController')
const {createItem, readItem, updateItem, deleteItem} = require('../controllers/itemController')
const {authentication, authorization} = require('../middlewares/auth')
const {userValidation, loginValidation, updateUserValidation} = require('../middlewares/validator')

router.post('/createUser', userValidation, createUser)
router.post('/login', loginValidation, login)
router.get('/fetchUser/:page', authentication, fetchUser)
router.get('/fetchUserBySearch', authentication, fetchUserBySearch)
router.get('/fetchUserById/:userId', authentication, fetchUserById)
router.put('/updateUser/:userId', updateUserValidation, authentication, authorization, updateUser)
router.delete('/deleteUser/:userId', authentication, authorization, deleteUser)

router.post('/createItem/:userId', authentication, createItem)
router.get('/readItem/:userId', authentication, readItem)
router.put('user/:userId/updateItem/:itemId', authentication, authorization, updateItem)
router.delete('user/:userId/deleteItem/:itemId', authentication, authorization, deleteItem)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router
