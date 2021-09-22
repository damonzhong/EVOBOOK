var response = require('../Responses/userDataResponse');
const usersdao = require('../DAOs/usersDAO')



class GetUserCurrProcessor {

    async process(req, res) {
        
        var users = usersdao;
        const uid = req.query.userId;
        console.log("uid, getcurrprocess: "+ uid)
        const data = await users.getUserCurr(uid);
        //console.log(data + " returned data")
        console.log(data)
        // users.getUserData will return false on failure, so we want to check against that
        if (data !== false) {
            response.success = true;
            response.uid = data.uid;
            response.currency = data[0].currency;
            // if (response.currency > 0)
            //console.log("got enough")
            
            //
            // response.responseTime = new Date().toISOString();
            
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


const data = new GetUserCurrProcessor();
module.exports = data;