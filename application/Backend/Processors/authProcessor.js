var response = require('../Responses/authResponse');
const usersdao = require('../DAOs/usersDAO')



class authProcessor {

    async process(req, res) {

        const uname = JSON.stringify(req.body.uname);
        const password = JSON.stringify(req.body.password);

        var users = usersdao;


        const authed = await users.authUser(uname, password)
        console.log(authed)
        if (authed === true) {
            response.success = true;
            //response.fname = authed[0].fname;
            response.uname = uname;
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response));
        } else {
            response.success = false;
            response.uname = "";
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response))
        }


    }

}


const auth = new authProcessor();
module.exports = auth;