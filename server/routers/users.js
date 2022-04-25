const {createNewUser,deleteUser, loginUser, getAllUsers} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/',getAllUsers);
router.post('/add', createNewUser);
router.delete('/delete/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;


