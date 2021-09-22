const express = require('express');
const { insertUserIdInventory } = require('../Connectors/Mysql');
const connector = require('../Connectors/Mysql')
const router = express.Router()

const insertTaskProcessor = require('../Processors/InsertTaskProcessor');
const removeTaskProcessor = require('../Processors/RemoveTaskProcessor');
const taskCheckProcessor = require('../Processors/TaskCheckedProcessor');
const getAllTaskProcessor = require('../Processors/AllTaskProcessor')

// Take user's task input and insert into task table
//router.post('/api/insertedTask', insertTaskProcessor.process);
router.post('/api/addtask', insertTaskProcessor.process);

//Returns JSON object with task data
router.post('/api/Task', getAllTaskProcessor.process);

router.post('/api/RemoveTask', removeTaskProcessor.process)

//Update task, expects boolean value
router.post('/api/TaskChecked', taskCheckProcessor.process)

module.exports = router;