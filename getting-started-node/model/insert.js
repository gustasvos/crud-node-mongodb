const { connection } = require('../mongodb')

async function insertBody(body) {
    console.log(body)
    let con = await connection()
    let db = con.db().collection('teste')

    body.members.forEach(e => {
        db.insertOne(e)
    });
}

module.exports = { insertBody }