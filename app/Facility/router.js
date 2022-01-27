var express = require('express');
var router = express.Router();
const {FacilityList, viewCreate, actionCreate, viewDetail, viewEdit, actionEdit} = require('./controller')
const multer = require('multer')
const os = require('os')

/* GET home page. */
const {isLoginAdmin} = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', FacilityList);
router.get('/create', viewCreate);
router.post('/create',multer({dest:os.tmpdir()}).single('thumbnail'), actionCreate);
router.get('/:id', viewDetail);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id',multer({dest:os.tmpdir()}).single('thumbnail') ,actionEdit);


module.exports = router;
