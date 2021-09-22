const express = require('express');
const connector = require('../Connectors/Mysql')
const router = express.Router();

const itemsInventory = require('../Processors/UserInventoryProcessor')
// Create routers to display all items in inventory

router.post('/api/userItems', itemsInventory.process)

module.exports = router;