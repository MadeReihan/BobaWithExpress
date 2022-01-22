var express = require('express');
var router = express.Router();
const {FacilityList, viewCreate, actionCreate} = require('./controller')
const multer = require('multer')
const os = require('os')

/* GET home page. */
router.get('/', FacilityList);
router.get('/create', viewCreate);
router.post('/create',multer({dest:os.tmpdir()}).single('thumbnail'), actionCreate);


module.exports = router;
