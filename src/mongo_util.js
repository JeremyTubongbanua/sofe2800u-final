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

const login = async (username, password, sessionId) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("users");
  if (await userExistsWithPassword(username, password)) {
    const doc = { username, sessionId };
  }
};

const sessionExists = async (username) => {
  const client = await generateDb();
  const db = client.db("SOFE2800U");
  const collection = db.collection("sessions");
  const query = { username };
  return await exists(collection, query);
};

module.exports = {
  insertUser,
  userExists,
  userExistsWithPassword,
  login,
  sessionExists,
};
