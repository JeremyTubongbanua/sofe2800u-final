const express = require("express");
const mongoUtil = require('./mongo_util.js');

const initializeWebServer = () => {
    const app = express();
    const port = 3000;
    
    app.use(express.static("public"));

    app.use(express.json());
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
        console.log("http://localhost:3000");
    });
    
    app.post("/insert/user", (req, res) => {
        res.send('Got a POST request');
        const {username, password, email, firstName, lastName, type} = req.body;
        console.log(req.body);
        mongoUtil.insertUser(username, password, email, firstName, lastName, type);
    });

    app.get("/exists/user", (req, res) => {
        res.send('Got a GET request');
        const {username} = req.body;
        mongoUtil.userExists(username);
    });
}

initializeWebServer();
