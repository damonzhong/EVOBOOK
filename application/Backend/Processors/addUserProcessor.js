const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const adduserResponse = require('../Responses/addUserResponse')
const usersdao = require('../DAOs/usersDAO')


class addUserProcessor {

    async process(req,res) {
        const uname = JSON.stringify(req.body.uname);
        const password = JSON.stringify(req.body.password);
        const uid = uuidv4();
        const fname = JSON.stringify(req.body.fname);
        const lname = JSON.stringify(req.body.lname);
        const email = JSON.stringify(req.body.email);

        console.log(fname)

            // First build response template
            var response = adduserResponse;

            // Instantiate users DAO
            var users = usersdao;

            const created = await users.addUser(fname, lname, email, password, uname, uid);
            //.catch(err => alert(err));
            
            if (created === true) {
                response.success = true;
                response.uid = uid;
                response.uname = uname;
                response.fname = fname;
                response.responseTime = new Date().toISOString();
                res.send(JSON.stringify(response));
            } else {
                // User Add Failed
                response.success = false;
                response.uname = '';
                response.uid = -1;
                response.responseTime = new Date().toISOString();
                res.send(JSON.stringify(response))

            }

        }
}

const processor = new addUserProcessor()
module.exports = processor;