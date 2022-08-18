const { MongoClient } = require('mongodb')
// const CONFIG = require('./config')
const CONFIG = require('./config.json')
const { updateBody } = require('./model/update')


async function connection() {

  const uri = CONFIG.config.uri

  const client = new MongoClient(uri)

  // Connect to the MongoDB cluster
  await client.connect()
  // Make the appropriate DB calls
  return client
}

module.exports = {connection}