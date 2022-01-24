var express = require('express');
var router = express.Router();
const {viewSignin,actionSignin,logOut, viewRegister, actionRegister} = require('./controller')

/* GET home page. */   
router.get('/login',viewSignin);
router.post('/login',actionSignin);
router.get('/register',viewRegister);
router.post('/register',actionRegister);

router.get('/logout',logOut);

module.exports = router;