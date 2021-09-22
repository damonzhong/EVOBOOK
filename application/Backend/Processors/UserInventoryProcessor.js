var response = require('../Responses/UserInventoryResponse');
const inventorydao = require('../DAOs/InventoryDAO')



class userInventoryProcessor {

    async process(req, res) {

        const uid = JSON.stringify(req.body.uid);
        var inventory = inventorydao;
        const data = await inventory.getUserInventory(uid);


        var dataArray = []
        var i = 0;
        for ( i = 0; i < data.length; i++ ) {
            dataArray.push(JSON.stringify(data[i].itemName));
        }
        //console.log("Data Arrayyyyyy  " + dataArray)
        // users.getUserData will return false on failure, so we want to check against that
        console.log("data by itself:   "+ data)
        //response.items = pleaseWork

        if (data !== false) {
            response.items = dataArray
            console.log("response items : " + response.items)
            res.send(response)
            //res.send(JSON.stringify(response));
        } else {

            response.success = false;
            res.send(JSON.stringify(response))
        }


    }

}


const data = new userInventoryProcessor();
module.exports = data;