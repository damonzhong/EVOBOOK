var mysql = require('mysql');
const bcrypt = require('bcrypt');
const { threadId } = require('node:worker_threads');

var SQLConnector = function() {

    this.connection = connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
    // *** This will need to be changed for production environment ***
        user: "root",
        password: "1234",
        database: "gswd"
    // ***************************************************************
    
    });


    /** 
     *  Display All Task function 
     */
    this.getAllTask = function(uid, res) {
        let sql = 'SELECT * FROM task WHERE uid = ?';
        this.connection.query(sql, uid, function(error, results, fields) {
            console.log("checking for all task MySql " + results)
            if (error) res(error, false);
            else res(error, results);
       });
    }

    /**
     * Insert User Task into Task table
     */
    // Include 24 hour time
    this.insertTaskDB = function(uid, taskName, taskDesc, taskFreq, taskTime, res) {
        var pUID = JSON.parse(uid)
        var tName = JSON.parse(taskName)
        var tFreq = JSON.parse(taskFreq)
        var tTime = JSON.parse(taskTime)
        var tDesc = JSON.parse(taskDesc)
        var tCheck = 0

        // console.log(tName + " mysql taskname")
        // console.log(tTime + " mysql tasktime")
        var taskInfo = [[pUID, tName, tFreq, tTime, tDesc, tCheck]];
        //var taskInfo = [[tName, tTime]]
        let sql2 = `INSERT INTO task (uid, taskName, taskFrequency, taskTime, taskDescription, taskCheck) VALUES ?`;
        this.connection.query(sql2, [taskInfo], function(error, results, fields) {
            console.log("query result insertTask: " + results)
            if (error) res(error, false);
            else res(error, results);
       });
    }

        // Delete task -- Completed Task
    // For now takes in taskName, should include userId
    this.removeTaskDB = function(taskid, res) {
        //var uId = userId
        //var tName = JSON.parse(taskName)
        //var taskInfo = [[uId, tName]]

        let sql = `DELETE FROM task WHERE taskId = ${taskid};`
        this.connection.query(sql, function(error, results, fields) {
            console.log("query results removeTask: " + results)
            if (error) res(error, false);
        })

    }

    //this is for the check box
    this.isTaskCheckedDB = function(taskid, isTaskChecked, res) {
        //task id
        //var tID = JSON.parse(taskid)
        var tCheck = isTaskChecked

        if (tCheck == false) {

            var sql = `UPDATE task SET taskCheck = 0 WHERE taskId = ?`
            this.connection.query(sql, taskid, function(error, results, fields) {
                if (error) res(error, false);
                else res(error, results);
            })
        } else {
            var sql = `UPDATE task SET taskCheck = 1 WHERE taskId = ?`
            this.connection.query(sql, taskid, function(error, results, fields) {
                if (error) res(error, false);
                else res(error, results);
            })
        }
    }

   this.getTaskIDFromDB = function(taskName, uid, res) {

        //parseUID = JSON.parse(uid)
        //tName = JSON.parse(taskName)
        let sql = `SELECT taskId FROM task WHERE taskName = ${taskName} and uid = ${uid}`
        connection.query(sql, function(error, results, fields) {
            console.log("this is task getitng task id: " + results)
            if(error) res(error, false);
            else res(error, results);
        })

   }
   
   this.getItemsFromDB = function(req, res) {
        
        let sql = `SELECT * FROM items`;
        connection.query(sql, function(error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
            
            // Need logic here to verify that query has returned some results
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.write(JSON.stringify(results))
            res.end()
            
        });
    }
    
    // make a function that take itemdId and usersId
    // create a function that takes itemId as an arguement and query into the item table to get sellValue
    //(itemId, userId, sellValue) fourth function this will be how we insert into inventory

    // Currency check before buying
    this.checkUserCurr = function(userId, res) {
        
        console.log("this is checkkmysql:   " + userId)
        let sql = `SELECT currency FROM users WHERE uid = ` + userId;
        this.connection.query(sql, function(error, results, fields){
            console.log("checkcurr after qurery:   " + results)
            if (error) res(error, false);
            else res(error, results);
        })
    }
    
    this.itemSellValue = function(itemname, res){
        let sql = `SELECT sellvalue FROM items WHERE itemname = ${itemname}`
        this.connection.query(sql, function(error, results, fields){
            if (error) res(error, false)
            else res(error, results)
        })
    }


    this.itemBuyValue = function(itemname, res){
        let sql = `SELECT buyvalue FROM items WHERE itemname = ${itemname}`
        this.connection.query(sql, function(error, results, fields){
            if (error) res(error, false)
            else res(error, results)
        })
    }

    this.updateCurrency = function(userId, newCurr, res) {
        let sql = `UPDATE users SET currency = ? WHERE uid = ` + userId
        this.connection.query(sql, newCurr, function(error, results, fields){
            if (error) res(error, false);
            else res(error, results);
        })
    }

    // Inserts the itemId into inventory
    this.buyItemDB2 = function(itemName, res) {
        console.log(itemName + "mysql db2");
        let sql1 = `INSERT INTO inventory (itemName, sellValue) SELECT itemname, sellvalue  FROM items WHERE itemname = ` + itemName
        //let sql1 = `select * from items where itemname = ?`
        this.connection.query(sql1, function(error, results, fields) {
            if (error) res(error, false);
            else res(error, results);
       })
    }

    // Function to insert userId into inventory after successful insertion of item in inventory
    this.insertUserIdInventory = function (invId, userId, res) {
        
        var parsedUID = JSON.parse(userId);

        let sql = `UPDATE inventory SET uid = ? WHERE inventoryid = ` + invId;
        this.connection.query(sql, parsedUID, function(error,results, fields) {
            console.log("****mysql insertuserid results:  " + results)
            if (error) res(error, false);
            else res(error, true);
        })
    }

    this.getInventoryId = function(itemname, uid, res){
        console.log("my sql getinventoryId ITEMNAME:  " + itemname)
        console.log("my sql getinventoryId UID:  " + uid)
        let sql = `SELECT inventoryid FROM inventory WHERE itemname = ${itemname} AND uid = ${uid}`
        this.connection.query(sql, function(error, results, fields){
            if (error) res(error, false)
            else res(error, results)
        })
    }

    //sell items from inventory
    this.sellItemsDB = function(invID, res){
        let sql = `DELETE FROM inventory WHERE inventoryid = ?;`
        this.connection.query(sql, invID, function(error, results, fields){
            if (error) res(error, false)
            else res(error, results)
        })
    }
    

    this.selectUserInventory = function(uid, res){
        let sql = `SELECT * FROM inventory WHERE uid = ${uid}`
        this.connection.query(sql, function(error, results, fields) {
            if (error) res(error, false)
            else res(error, results)
        })
    }

    // suppose to get item for search
    // this.getFilterItemsFromDB = function(req, res) {
    //     let sql = `SELECT * from items WHERE itemname like '%${req.params.name}%'`
    //     connection.query(sql, function(error, results,fields) {
    //         if (error) {
    //             return console.error(error.message);
    //         }
    //     res.setHeader('Content-Type', 'application/json')
    //         res.statusCode = 200
    //         res.write(JSON.stringify(results))
    //         res.end()
    //     });
    // }

    // This function has a major flaw in that if a user is inserted into one or more tables, and errors on subsequent tables,
    // they will no longer be able to register under this email
    this.authUserDB = function(uname, pwd, callback) {

        var sql = "select profiles.username as user, accounts.password as password from profiles join accounts \
        on accounts.userProfileID = profiles.profileID \
        where profiles.username = ?"

        uname = JSON.parse(uname);
        pwd = JSON.parse(pwd);
        //console.log(uname)

        this.connection.query(sql, uname, function (err, results) {
            if (err) callback(err, false);
            if (results.length <= 0) callback(err, false);
            else callback(err, bcrypt.compareSync(pwd, results[0].password) );
            
        })
    }

    this.addUserDB = function(fname, lname, email, password, uname, uid, callback) {

        console.log(fname);

        //Parse variables to remove surrounding quotes
        fname = JSON.parse(fname);
        lname = JSON.parse(lname);
        email = JSON.parse(email);
        password = JSON.parse(password);
        uname = JSON.parse(uname);
        startingCurrency = 100000;

        // First add an entry to the users table
        var vars = [[fname, lname, email, uid, startingCurrency]];
        var sql = "insert into users (fname, lname, email, uid, currency) values ?";
        this.connection.query(sql, [vars], function(err, results) {
            if (err) callback(err, false);
        })


        // Create an entry into the accounts table

        // Salt + Hash Password
        const hashedpw = bcrypt.hashSync(password, 10);
        var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        vars = [[uid, hashedpw, datetime]];
        sql = 'insert into accounts(userID, password, accountCreated) values ?';

        this.connection.query(sql, [vars], function(err, results) {
            if (err) callback(err, false);
        })


        // Create an entry into profiles table
        vars = [[uname, uid]]
        sql = 'insert into profiles(username, userID) values ?';

        this.connection.query(sql, [vars], function(err, results) {
            if (err) callback(err, false);
        })


        // update the accounts table with the generated profileID from previous step
        sql = 'update accounts \
        inner join profiles on accounts.userID = profiles.userID \
        set accounts.userProfileID = profiles.profileID \
        where accounts.userID = profiles.userID;'

        this.connection.query(sql, function(err, results) {
            if (err) callback(err, false);
            else callback(err, true);
        })


    }

    // We need to retrieve uid, email, time that the account was registered
    this.getUserDataDB = function(uname, callback) {

        var sql = "select users.email, accounts.accountCreated, profiles.username, users.fname, users.uid, users.currency\
        from users \
        join accounts on users.uid = accounts.userID \
        join profiles on profiles.userID = users.uid \
        where profiles.username = ?"

        uname = JSON.parse(uname)

        this.connection.query(sql, uname, function(err, results) {
            if (err) callback(err, false)
            if (!results) callback(err, false)
            else callback(err, results);
        })



    }

    //Shows inventory
    this.getInventoryFromDB = function(req, res) {

        var sql = 'SELECT * FROM inventory;'

        connection.query(sql, function(error, results,fields) {
            if (error) {
                return console.error(error.message);
            }
            // Need logic here to verify that query has returned some results
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.write(JSON.stringify(results))
            res.end()
            
        });
    }
}


const connector = new SQLConnector;
module.exports = connector;
