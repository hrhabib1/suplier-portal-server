const router = require('express').Router()
const userItemController = require('../Controller/UserItemController')

// userItem routes
router.get('/userItems',userItemController.getAllUserItems)
router.post('/userItems',userItemController.createUserItem )
router.delete('/userItems/:user_order',userItemController.deleteUserItem )

// router.get('/userItems/:id',userItemController.getuserItemById )
// router.put('/userItems/:userItems_id',userItemController.updateuserItem )
 
module.exports= router;  