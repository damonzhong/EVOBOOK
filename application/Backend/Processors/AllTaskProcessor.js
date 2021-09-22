var response = require('../Responses/AllTaskResponse');
const tasksdao = require('../DAOs/TaskDAO');
const { taskAll } = require('../Responses/AllTaskResponse');



class AllTaskProcessor {

    async process(req, res) {
        
        var task = tasksdao
        console.log(req.body.uid)
        var uid = req.body.uid
        const data = await task.allTask(uid);
        //console.log(data + " returned data")
        console.log(data)
        //var jsonTask = JSON.parse(JSON.stringify(data))
        //var jsonTask = JSON.parse(JSON.stringify(data))
        //console.log(jsonTask)
        var dataArray = []
        var i = 0;
        // for ( i = 0; i < data.length; i++ ) {
        //     dataArray.push(data[i]);
        // }
        // users.getUserData will return false on failure, so we want to check against that
        if (data !== false) {
            // response.success = true;
            // response.taskid = data.taskId
            // response.taskName = data.taskName
            // response.taskFrequency = data.taskFrequency
            // response.taskTime = data.taskTime
            // response.taskDescription = data.taskDescription
            response.taskAll = dataArray
            console.log("array")
            //console.log(response.taskAll)
            res.send(data)
            
        } else {
            response.success = ""
            response.taskid = ""
            response.taskName = ""
            response.taskFrequency = ""
            response.taskTime = ""
            response.taskDescription = ""

            
            res.send(JSON.stringify(response))
        }


    }

}

const processor = new AllTaskProcessor();
module.exports = processor;