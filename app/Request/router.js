var express = require('express');
var router = express.Router();
const {requestList, viewCreate, actionCreate} = require('./controller')


/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', requestList);
router.get('/create', viewCreate);
router.post('/create', actionCreate);



module.exports = router;
