const itemResponse = require('../Responses/AddItemResponse');
const userResponse = require('../Responses/userDataResponse');
const itemsDAO = require('../DAOs/ItemsDAO');
const usersDAO = require('../DAOs/usersDAO');
// Add Item Processor found in ItemsDAO


//currently attempting to fetch inventoryId of the inserted item
class addItemProcessor {
    
    async process(req, res) {
     // Stores itemId from query into itemId
        const itemName = (JSON.stringify(req.body.itemName));
        const userId = (JSON.stringify(req.body.uid))

        var items = itemsDAO;
        var userCurr = usersDAO;
        //get item sell value
        const getBuyVal = await items.getItemBuyVal(itemName)
        //console.log("get buyval: " + getBuyVal[0].buyvalue)
        const checkCurr = await userCurr.getUserCurr(userId);
        //console.log("users current curr: " + checkCurr[0].currency)
        if (checkCurr !== 0) {
            try {
                if (checkCurr[0].currency < getBuyVal[0].buyvalue) {
                    console.log("not enough currency")
                    res.send(false)
                } else {
                    //buy item 
                    // mathCurr stores value of updated currency for user
                    var mathCurr = false;
                    try {
                        mathCurr = checkCurr[0].currency - getBuyVal[0].buyvalue;
                    } catch(error) {
                        console.error(error);
                        res.send(false);
    ;               }
                    console.log("mathcurr: " + mathCurr)
                    console.log("typeofmathcurr :" + mathCurr)
                    const updateCurr = await userCurr.updateCurr(userId, mathCurr)
                    console.log("updateCurr" + updateCurr)
                    // Insert into inventory table (itemName and sell value)
                    const addItem = await items.buyItem(itemName);
                    console.log("this is addItem: " + addItem.insertId)

                    console.log(addItem.insertId);
                    if (addItem.insertId > 0 ) {
                        itemResponse.success = true;
                        itemResponse.inventoryId = addItem.insertId;
                        itemResponse.newCurrency = mathCurr;
                        itemResponse.responseTime = new Date().toISOString();

            
                        // Use response.inventoryId to pass into a insert into inventory DAO
                        const addUidInv = await items.insertUidInv(itemResponse.inventoryId, userId);
                        userResponse.newCurrency = mathCurr
                        userResponse.success = true;
                        // Sends back object with data, see addItemResponse for variable names
                        console.log(itemResponse)
                        res.send(JSON.stringify(itemResponse))
            
                    } else {
                        // Add item Failed
                        itemResponse.success = false;
                        //response.itemName = '';
                        //itemResponse.responseTime = new Date().toISOString();
                        res.send(JSON.stringify(itemResponse))
            
                    }
                }
            } catch(error) {
                console.error(error);
                res.send(false);
            }
            
        }

        // const addItem = await inventory.buyItem(itemName);
        // console.log(addItem);
        // console.log(addItem.insertId);
        // if (addItem.insertId > 0 ) {
        //     response.success = true;
        //     response.inventoryId = addItem.insertId;
        //     response.responseTime = new Date().toISOString();
        //     // Unclear what exactly front end needs as a response
        //     // Check Responses/BuyItemResponse to see possible responses
        

        //     // Use response.inventoryId to pass into a insert into inventory DAO
        //     const addUidInv = await inventory.insertUidInv(response.inventoryId, userId);
        //     res.send(JSON.stringify(response.success));

        // } else {
        //     // Add item Failed
        //     response.success = false;
        //     //response.itemName = '';
        //     response.responseTime = new Date().toISOString();
        //     res.send(JSON.stringify(response))

        // }
        //for inserting into inventory to the MySql.js function
        //const addToInventory = await addToInventoryMYSQL.insert_ItemId_UserId_sellValue(itemId, sellValueFromSomewhereGlobalMaybe, UserId)
        //respond true item successfully bought

    }
}

const processor = new addItemProcessor();
module.exports = processor;