const taskDAO = require('../DAOs/TaskDAO');
const userDAO = require('../DAOs/usersDAO');
const response = require('../Responses/TaskCheckedResponse');

class taskCheck {
	async process(req, res) {
		const uid = JSON.stringify(req.body.uid);
		const taskName = JSON.stringify(req.body.taskName);
		const isTaskChecked = req.body.isChecked;
		console.log('this is taskcheck processor' + taskName);
		console.log('this is taskcheck processor bool' + isTaskChecked);
		console.log('this is task uid: ' + uid);
		// console.log(taskName)
		// console.log(taskTime)

		var task = taskDAO;
		var taskid = taskDAO;
		var userCurrentCurrency = userDAO;
		var updateUserCurrency = userDAO;
		const getTaskId = await taskid.taskid(taskName, uid);
		const checkTask = false;
		try {
			console.log('getting the taskid back in processor: ' + getTaskId[0].taskId);
			checkTask = await task.taskCheck(getTaskId[0].taskId, isTaskChecked);
			console.log(checkTask + ' processor task checked');
		} catch (error) {
			console.error(error);
		}
		if (checkTask !== false) {
			response.success = true;
			const userCurr = await userCurrentCurrency.getUserCurr(uid);
			console.log(' %%%% this is user curr without .currency: ' + userCurr);
			if (userCurr !== false) {
				console.log('this is user curr taskcheckprocess:   ' + userCurr[0].currency);
				var newCurr = userCurr[0].currency + 100;
				const updatedCurr = updateUserCurrency.updateCurr(uid, newCurr);
			} else {
				console.log('failed to update currency');
			}
			res.send(response);
		} else {
			response.success = false;
			res.send(response);
		}
	}
}

const processor = new taskCheck();
module.exports = processor;
