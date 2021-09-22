var response = require('../Responses/userDataResponse');
const usersdao = require('../DAOs/usersDAO')



class userDataProcessor {

    async process(req, res) {

        const uname = JSON.stringify(req.body.uname);
        var users = usersdao;

        console.log("userdataprocessor: " + req.body.uname)
        const data = await users.getUserData(uname);

        console.log(data)
        // users.getUserData will return false on failure, so we want to check against that
        if (data !== false) {
            response.success = true;
            response.uid = uname;
            response.currency = data[0].currency;
            // Needed from getUserData
            response.rtime = data[0].accountCreated;
            response.uid = data[0].uid;
            response.email = data[0].email;
            response.fname = data[0].fname;
            //
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response));
        } else {
            response.rtime = '';
            response.uid = '';
            response.email = '';

            
            response.success = false;
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response))
        }


    }

}


const data = new userDataProcessor();
module.exports = data;