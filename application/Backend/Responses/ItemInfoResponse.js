// Can add anything here that the front end needs eg: sessions ID, UID, etc..
var itemInfoResponse = function() {
    this.itemName = "";
    this.itemId = "";
    this.buyValue = "";
    this.sellValue = "";
    this.currency = 0;
    this.success = false;
}

const response = new itemInfoResponse;
module.exports = response;