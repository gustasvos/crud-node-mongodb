const { MongoClient } = require('mongodb');
const CONFIG = require('./config')


async function connection() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = CONFIG.APP.HOST

  const client = new MongoClient(uri)

  // Connect to the MongoDB cluster
  await client.connect()
  // Make the appropriate DB calls
  return client
}

module.exports = {connection}