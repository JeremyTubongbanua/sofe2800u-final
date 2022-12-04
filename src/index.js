const express = require("express");
const mongoUtil = require("./mongo_util.js");

const initializeWebServer = () => {
  const app = express();
  const port = 3000;

  app.use(express.static("public"));

  app.use(express.json());

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    console.log("http://localhost:3000");
  });

  // INSERTS user into users collection
  app.post("/insert/user", (req, res) => {
    res.send("Got a POST request");
    const { username, password, email, firstName, lastName, type } = req.body;
    console.log(req.body);
    mongoUtil.insertUser(username, password, email, firstName, lastName, type);
  });

  // creates a session under the sessions collection
  app.post("/login", async (req, res) => {
    const { username, password, sessionId } = req.body;
    const success = await mongoUtil.login(username, password, sessionId);
    const data = {
        success,
    };
    res.send(data);
  });

  // checks if username exists in users collection
  app.post("/exists/user", async (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    const exists = await mongoUtil.userExists(username);
    const data = { exists };
    res.send(data);
  });

  // checks if user session exists
  app.post("/exists/session", async (req, res) => {
    const { username } = req.body;
    const sessionExists = await mongoUtil.sessionExists(username);
    console.log("sessionExists: " + sessionExists);
    res.send({
      sessionExists,
      sessionId: await mongoUtil.getSession(username),
    });
  });
};

initializeWebServer();
