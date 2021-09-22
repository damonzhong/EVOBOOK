const connector = require('../Connectors/Mysql')

var inventoryDAO = function() {

    this.getUserInventory = function(uid) {
        return new Promise(function(resolve, reject){
            connector.selectUserInventory(uid, function(error, results){
                resolve(results);
            })
        })
    }

    this.getInventoryIdSell = function(itemName, uid){
        console.log(uid + " this is userid inventoryDAO DAO dAO")
        return new Promise(function(resolve, reject) {
            connector.getInventoryId(itemName, uid, function(err,result) {
                // result is true or false
                resolve(result);
            })
        })
    }

    this.removeItemFromInventory = function(invID){
        console.log(invID + " this is invid inventoryDAO DAO dAO")
        return new Promise(function(resolve, reject) {
            connector.sellItemsDB(invID, function(err,result) {
                // result is true or false
                resolve(result);
            })
        })
    }

}


const inventory = new inventoryDAO;
module.exports = inventory;