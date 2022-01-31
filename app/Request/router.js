var express = require('express');
var router = express.Router();
const {requestList, viewCreate, actionCreate, actionStatus} = require('./controller')


/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', requestList);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.put('/status/:id',actionStatus);



module.exports = router;
