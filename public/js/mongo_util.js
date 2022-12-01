const { MongoClient, ServerApiVersion } = require("mongodb");
const { getUser, getPass } = require("./env_reader.js");

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

const insertUser = async (db, username, password) => {
  const collection = db.collection("users");
  const doc = { username, password };
  return await insertDoc(collection, doc);
}

module.exports = {generateDb, insertDoc};
