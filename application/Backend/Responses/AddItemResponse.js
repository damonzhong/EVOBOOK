//Change InventoryResponse to BuyItemResponse
//Response for purchase item, with id, name, price, response time
var addItemResponse = function () {
    this.inventoryId = "";
    this.itemId = "";
    this.userId = "";
    this.itemName = "";
    this.responseTime = false;
    this.sellValue;
    this.success = false;
    this.newCurrency = 0;
}

const response = new addItemResponse;
module.exports = response;