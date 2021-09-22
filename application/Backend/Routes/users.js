var express = require('express');
var router = express.Router();
//var addUserProcessor = new addUserProcessor();
const registerProcessor = require('../Processors/addUserProcessor')
const authProcessor = require('../Processors/authProcessor')
const userDataProcessor = require('../Processors/UserDataProcessor')
const userCurr = require('../Processors/GetUserCurrProcessor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/curr', userCurr.process);

// Add User requires the following data in request body
// fname: user first name
// lname: user last name
// email: users email address
// password: users password
// uname: users 'username' for sign in / profile display

// See Responses/addUserResponse for more information on response contents
router.post('/users/api/addUser', registerProcessor.process);


// Authenticate User requires the following data in request body
// uname: users registered username
// password: users registered password

// See Responses/authResponse for more information on response contents
router.post('/users/api/auth', authProcessor.process);


// Get User Data endpoint for display on profile requires the following data in request body
// uname: users registered username

// See Responses/userDataResponse for more information on response contents
router.post('/users/api/data', userDataProcessor.process);



module.exports = router;