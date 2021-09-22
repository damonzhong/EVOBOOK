const { resolve } = require('node:path');
const connector = require ('../Connectors/Mysql');

var taskDAO = function() {

    this.insertTask = function (uid, taskName, taskFreq, taskTime, taskDesc) {
        return new Promise(function(resolve, reject) {
            connector.insertTaskDB(uid, taskName, taskFreq, taskTime, taskDesc, function(err, result) {
                resolve(result);
            })
        })
    }

    this.taskCheck = function (taskid, isTaskChecked) {
        return new Promise(function(resolve, reject) {
            connector.isTaskCheckedDB (taskid, isTaskChecked, function(err, results){
                resolve(results)
            })
        })
    }

    this.removeTask = function (taskid, uid) {
        return new Promise(function(resolve, reject) {
            connector.removeTaskDB (taskid, uid, function(err, results){
                resolve(results)
            })
        })
    }

    this.allTask = function (uid) {
        return new Promise(function(resolve, reject) {
            connector.getAllTask (uid, function(err, results){
                resolve(results)
            })
        })
    }

    this.taskid = function (taskName, uid) {
        return new Promise(function (resolve, reject) {
            connector.getTaskIDFromDB (taskName, uid, function(err, results){
                resolve(results)
            })
        })
    }
}

const task = new taskDAO;
module.exports = task;