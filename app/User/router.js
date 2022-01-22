var express = require('express');
var router = express.Router();
const { UserList, viewCreate, actionCreate} = require('./controller')

/* GET home page. */
router.get('/', UserList);
router.get('/create', viewCreate);
router.post('/create', actionCreate);

module.exports = router;
