// Can add anything here that the front end needs eg: sessions ID, UID, etc..
var userDataResponse = function() {
    this.uname = "";
    this.fname = "";
    this.uid = "";
    this.rtime = "";
    this.email = "";
    this.currency = 0;
    this.success = false;

}

const response = new userDataResponse;
module.exports = response;