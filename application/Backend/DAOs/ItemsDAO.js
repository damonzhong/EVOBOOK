const connector = require('../Connectors/Mysql')

var itemsDAO = function() {

    // Could be a list of userDTO objects, or JSON objects with user Data from DB
    this.getItemSellVal = function(itemName){
    // Return a new promise based on the result of getItemInfo
        console.log(itemName + " this is DAO");    
        return new Promise(function(resolve, reject) {
            connector.itemSellValue(itemName, function(err,result) {
                // result is true or false
                resolve(result);
            })
        })
    }

    this.getItemBuyVal = function(itemName){
        // Return a new promise based on the result of getItemInfo
            console.log(itemName + " this is DAO");    
            return new Promise(function(resolve, reject) {
                connector.itemBuyValue(itemName, function(err,result) {
                    // result is true or false
                    resolve(result);
                })
            })
        }

    // Inserting into Inventory Table to be handled here in ItemsDAO
    this.buyItem = function(itemName){
        // Return a new promise based on the result of getItemInfo
            console.log(itemName + " this is DAO");
            return new Promise(function(resolve, reject) {
                connector.buyItemDB2(itemName, function(err,result) {
                    // result is true or false
                    resolve(result);
                })
            })
    }

    // Insert Uid where inventory ID = ?
    this.insertUidInv = function (invId, userId) {
        console.log(userId + " this is userid insertuid")
        return new Promise(function(resolve, reject) {
            connector.insertUserIdInventory(invId, userId, function(err,result) {
                // result is true or false
                resolve(result);
            })
        })
    }

    //this.getitemprice = function(itemid)
    // result returns sellvalue
}


const items = new itemsDAO;
module.exports = items;