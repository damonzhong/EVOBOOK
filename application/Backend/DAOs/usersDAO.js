const connector = require('../Connectors/Mysql')

var usersDAO = function() {

    // Could be a list of userDTO objects, or JSON objects with user Data from DB
    this.userList = [];
    this.userCount = 0;


    this.addUser = function(fname, lname, email, password, uname, uid) {

        // Return a new promise based on the result of addUserDB
       return new Promise(function(resolve, reject) {
           connector.addUserDB(fname, lname, email, password, uname, uid, function(err, result) {
               // result is true or false
               resolve(result);
           })
       })
        
    }

    this.authUser = function(name, password) {

        // Return a new promise based on the result of authUserDB
        return new Promise(function(resolve, reject) {
            connector.authUserDB(name, password, function(err,result) {
                // result is true or false
                resolve(result);
            })
        })
    }


    this.getUserData = function(uid) {
        return new Promise(function(resolve, reject) {
            connector.getUserDataDB(uid, function(err, results) {
                // result needs to be a JSON object containing user data or indicator of failure
                //console.log(results);
                resolve(results);
            })
        })
    }

    this.getUserCurr = function(uid) {
        return new Promise(function(resolve, reject) {
            connector.checkUserCurr(uid, function(err, results){
                resolve(results);
            })
        })
    }

    this.updateCurr = function(uid, updatedCurr) {
        return new Promise(function(resolve, reject) {
            connector.updateCurrency(uid, updatedCurr, function(err, results){
                resolve(results)
            })
        })
    }
}


const usersdao = new usersDAO;
module.exports = usersdao;