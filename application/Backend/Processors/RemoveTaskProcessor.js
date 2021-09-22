const taskDAO = require('../DAOs/TaskDAO')
const response = require('../Responses/RemoveTaskResponse')

class removeTaskProcessor {
    
    async process(req, res) {

        const taskName = (JSON.stringify(req.body.taskName))
        const uid = (JSON.stringify(req.body.uid))
        //const uid = (JSON.stringify(req.body.uid))
        
        console.log("this is remove task processor: " + taskName)
        console.log("this is remove task processor: " + uid)

        var task = taskDAO;
        var taskRemover = taskDAO
        var taskid = false
        try {
            taskid = await task.taskid(taskName, uid);
        } catch(error) {
            console.error(error);
            res.send(false);
        }
        //console.log(" XXXX this is the task id for removing: " + taskid[0].taskId)
        var removeTask = false;
        try {
            removeTask = await taskRemover.removeTask(taskid[0].taskId);
        } catch(error) {
            console.error(error);
            res.send(false)
        }
        console.log(removeTask + " processor remove task")
        if (removeTask !== false) {
            response.success = true
            res.send(true);
        } else {
            response.success = false;
            res.send(false);
        }

        
    }
}

const processor = new removeTaskProcessor();
module.exports = processor;