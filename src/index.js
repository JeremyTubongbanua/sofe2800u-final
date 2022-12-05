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

  app.post('/get/user/username', async (req, res) => {
    const { username } = req.body;
    const user = await mongoUtil.getUserWithUsername(username);
    res.send(user);
  });

  app.post('/get/user/sessionid', async (req, res) => {
    const { sessionId } = req.body;
    const user = await mongoUtil.getUserWithSessionId(sessionId);
    console.log(user);
    res.send(user);
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

  app.post("/get/jobs", async (req,res) => {
    const jobs = await mongoUtil.getJobs();
    res.send(jobs);
  });

  app.post('/edit/user', async (req, res) => {
    const { username, email, password, firstName, lastName, type } = req.body;
    const result = await mongoUtil.editUser(username, password, email, firstName, lastName, type);
    const success = result != null;
    res.send({success});
  });

  app.post('/insert/job', async (req, res) => {
    const {name, organization, location, qualification, imageUrl} = req.body;
    const result = await mongoUtil.insertNewJob(name, organization, location, qualification, imageUrl);
    const success = result != null;
    res.send({success}); // {success: true}
  });

  app.post('/get/users', async (req, res) => {
    const users = await mongoUtil.getUsers();
    res.send(users);
  })
};

initializeWebServer();
