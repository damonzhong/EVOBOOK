const express = require('express');
const connector = require('../Connectors/Mysql')
const router = express.Router();

//const getItemProcessor = require('../Processors/ItemInfoProcessor')
//Change Inventory Processor to BuyItemProcessor
const addItemProcessor = require('../Processors/AddItemProcessor')

const sellItemProcessor = require('../Processors/SellItemProcessor')


// new
router.get('/getAllItems', connector.getItemsFromDB);

//router.get('/getItemName', connector.getItemNameFromDB);

//Requires the following data in request body
//id: item ID
//router.post('/api/getItemInfo', getItemProcessor.process);



//testing sellItemDB
//changed router.delete to router.get
//router.delete('/api/sellItems', connector.sellItemsDB);

//sell item without delete router
router.post('/api/sellItems', sellItemProcessor.process);

// Takes in itemname and user id as query
router.post('/api/bItem', addItemProcessor.process);

module.exports = router;