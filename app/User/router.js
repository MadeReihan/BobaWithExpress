var express = require('express');
var router = express.Router();
const { UserList, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete} = require('./controller')

/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', UserList);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
