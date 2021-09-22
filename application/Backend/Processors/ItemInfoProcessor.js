var response = require('../Responses/ItemInfoResponse.js');
const itemsdao = require('../DAOs/ItemsDAO.js');


class itemInfoProcessor {

    async process(req, res) {

        const id = JSON.stringify(req.body.id);
        var items = itemsdao;


        const data = await items.getItemInfo(id);

        console.log(data)
        // users.getUserData will return false on failure, so we want to check against that
        if (s) {


            //
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response));
        } else {

            
            response.success = false;
            response.responseTime = new Date().toISOString();
            res.send(JSON.stringify(response))
        }


    }

}


const items = new itemInfoProcessor();
module.exports = items;