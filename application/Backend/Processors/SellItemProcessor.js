//const itemResponse = require('../Responses/SellItemResponse');
const userResponse = require('../Responses/userDataResponse');
const itemsDAO = require('../DAOs/ItemsDAO');
const usersDAO = require('../DAOs/usersDAO');
const inventoryDAO = require('../DAOs/InventoryDAO');
// Add Item Processor found in ItemsDAO


//currently attempting to fetch inventoryId of the inserted item
class sellItemProcessor {
    
    async process(req, res) {
        //console.log("reaching additem+ : " + JSON.stringify(req))
        // console.log(JSON.stringify(req.body.itemName));
        console.log("sellitemprocess itename: " + req.body.itemName)
        console.log("sellitemprocess uid: " + JSON.stringify(req.body.uid));        // Stores itemId from query into itemId
        const itemName = (JSON.stringify(req.body.itemName));
        const userId = (JSON.stringify(req.body.uid))

        var items = itemsDAO;
        var userCurr = usersDAO;
        var inventory = inventoryDAO;
        //get item sell value
        const getSellVal = await items.getItemSellVal(itemName)
        console.log("** sellprocessor... get sellval: " + getSellVal[0].sellvalue)
        const checkCurr = await userCurr.getUserCurr(userId);
        console.log(" ** sellprocessor... users current curr: " + checkCurr)
        
        const ItemInInventory = await inventory.getInventoryIdSell(itemName, userId)

        if (ItemInInventory === false){
            console.log("Error selling or no item in inventory")
            res.send(false)
        } else {
            var mathCurr = checkCurr[0].currency + getSellVal[0].sellvalue
            const updateCurr = await userCurr.updateCurr(userId, mathCurr)
            var removeItem = false;
            // Remove item from inventory based on the inventory from steps above
            try {
                 removeItem = await inventory.removeItemFromInventory(ItemInInventory[0].inventoryid)
            } catch (error) {
                console.error(error)
            }

            if (removeItem === false) {
                console.log("Error removing item from inventory")
                res.send(false)
            } else {
                res.send(true)
            }
        }

    }
}

const processor = new sellItemProcessor();
module.exports = processor;