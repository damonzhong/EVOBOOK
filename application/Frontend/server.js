const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT_NUMBER || 3000;
const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.use(express.static(path.join(__dirname, 'build')));

// Here routing is handled to make the request to the backend server
app.get("/api/getAllItems", (req, res) => {
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234/api'//Back End server Address / port goes here
  })
})

app.post("/api/bitem", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/api/sellItems", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/api/addTask", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/api/TaskChecked", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/users/api/auth", (req, res) => {
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234'//Back End server Address / port goes here
  })
})

app.post("/users/api/addUser", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/users/api/data", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.get('/api/readme', (req, res) => {
  console.log(req.body)
  res.send("Something Worked")
})


app.post("/api/RemoveTask", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/api/userItems", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.post("/api/Task", (req, res) => {
  console.log(req.path)
  apiProxy.web(req,res, {
    target: 'http://127.0.0.1:1234',
  })
})

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, () => console.log(`Front end server on port ${port}!`));
