const express = require("express")
const PORT = process.env.PORT || 1234;
const app = express();
const usersRouter = require('./Routes/users')
const itemRouter = require('./Routes/Items')
const inventoryRouter = require('./Routes/Inventory')
const taskRouter = require('./Routes/Task')
var multer = require('multer');
var upload = multer();


//app.use(router)
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(upload.array()); 
app.use(express.static('public'));

// Will handle all requests related to users, adding, authentication, retrieving info, etc..
// See Routes/users.js for more details on endpoint
app.use(usersRouter);
app.use(itemRouter);
app.use(taskRouter);
app.use(inventoryRouter);


app.listen(PORT, () => {
    console.log("Backend Server Listening on 1234")
})

module.exports = app;
