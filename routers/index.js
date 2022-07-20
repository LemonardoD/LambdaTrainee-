#! /usr/bin/env node

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usrController.js');

router.get('/[a-z0-9][a-zA-Z0-9\-\+\=\_\!\@\#\|\$\%\^\&\?\,\.]{0,}',userController.getInfo);
router.post('/[a-z0-9][a-zA-Z0-9\-\+\=\_\!\@\#\|\$\%\^\&\?\,\.]{0,}',userController.createRouter);

module.exports = router;