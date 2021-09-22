const bodyParser = require('body-parser');
const express = require('express')
const connector = require('../Connectors/Mysql')

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))

// User Routes
//router.post('/users', connector.createAccountDB)
router.post('/api/auth', connector.authenticateUser)
router.post('/users/api/addUser', connector.addUserDB)


// Item Routes

router.get('/api/curr', );

module.exports = router;