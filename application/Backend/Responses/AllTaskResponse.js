var allTaskResponse = function() {
    this.taskid = 0;
    this.taskName = "";
    this.taskFrequency = "";
    this.taskTime = "";
    this.taskDescription = "";
    this.taskAll = [];
    this.success = false;

}

const response = new allTaskResponse;
module.exports = response;