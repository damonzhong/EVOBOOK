const taskDAO = require('../DAOs/TaskDAO')
const response = require('../Responses/InsertTaskResponse')

class insertTaskProcessor {
    
    async process(req, res) {
        const uid = (JSON.stringify(req.body.uid))
        const taskName = (JSON.stringify(req.body.taskName))
        const taskFreq = (JSON.stringify(req.body.taskFreq))
        const taskTime = (JSON.stringify(req.body.taskTime))
        const taskDesc = (JSON.stringify(req.body.taskDesc))
        
        console.log(uid)
        console.log(taskName)
        console.log(taskTime)
        console.log(taskFreq)
        console.log(taskDesc)

        var task = taskDAO;
        const insertTask = await task.insertTask(uid, taskName, taskFreq, taskTime, taskDesc);
        console.log(insertTask + " processor insert task")
        if (insertTask.insertId > 0) {
            response.success = true;
            response.taskCheck = false;
            res.send(response);
        } else {
            response.success = false;
            res.send(response.success);
        }

        
    }
}

const processor = new insertTaskProcessor();
module.exports = processor;