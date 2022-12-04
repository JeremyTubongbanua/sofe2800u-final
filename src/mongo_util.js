const { MongoClient, ServerApiVersion } = require("mongodb");
const { getUser, getPass } = require("./env_reader.js");
const { v4 } = require("uuid");

const generateDb = async () => {
  const user = getUser();
  const pass = getPass();
  const uri = `mongodb://${user}:${pass}@ac-kqn2fjv-shard-00-00.u0idkn9.mongodb.net:27017,ac-kqn2fjv-shard-00-01.u0idkn9.mongodb.net:27017,ac-kqn2fjv-shard-00-02.u0idkn9.mongodb.net:27017/?ssl=true&replicaSet=atlas-sqahrw-shard-0&authSource=admin&retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  //   console.log("Connecting...");
  await client.connect();
  return client;
};

const insertDoc = async (collection, doc) => {
  //   console.log("inserting " + doc + " into " + collection.collectionName);
  const result = await collection.insertOne(doc);
  //   console.log(result.insertedId);
  return result;
};

const exists = async (collection, query) => {
  const result = await collection.findOne(query);
  console.log('query: ' + JSON.stringify(query) + ' ' + 'result: ' + JSON.stringify(result));
  return result != null;
};

const updateOne = async (collection, query, newValues) => {
  const nv = {
    $set: newValues,
  }
  const result = await collection.updateOne(query, nv, (err, res) => {
    if (err) {
      console.log(
        "Error found when trying updating to update one with query: " +
          query +
          " and newValues: " +
          newValues
      );
      console.log(err);
    }
    console.log(res);
  });
  return result;
};

/*

  simplified functions

*/

const insertUser = async (
  username,
  password,
  email,
  firstName,
  lastName,
  type
) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("users");
  const doc = { username, password, email, firstName, lastName, type };
  return await insertDoc(collection, doc);
};

const userExists = async (username) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("users");
  const query = { username };
  return await exists(collection, query);
};

const userExistsWithPassword = async (username, password) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("users");
  const query = { username, password };
  return await exists(collection, query);
};

// returns true/false if the login was successful
const login = async (username, password, sessionId) => {
  const client = await generateDb();
  if (await userExistsWithPassword(username, password)) {
    const db = client.db("SOFE2800U");
    const collection = db.collection("sessions");
    // 2 days
    const timeExpiry = (Date.now() + 2 * 24 * 60 * 60 * 1000); 
    const doc = { username, sessionId, timeExpiry };
    if(!(await sessionExists(username))) {
      console.log("inserting session");
      await insertDoc(collection, doc);
    } else {
      console.log("updating session");
      const query = { username };
      await updateOne(collection, query, doc);
    }
    return true;
  }
  return false;
};

const sessionExists = async (username) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("sessions");
  const query = { username };
  return await exists(collection, query);
};

const getSession = async (username) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("sessions");
  return await collection.findOne({ username });
}

module.exports = {
  insertUser,
  userExists,
  userExistsWithPassword,
  login,
  sessionExists,
  getSession,
};
