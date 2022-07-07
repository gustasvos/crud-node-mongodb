const { connection } = require('../mongodb')

async function updateBody(body) {
    let con = await connection()
    let db = con.db().collection('teste')
    let a = await db.findOne({name: "Gustavo"})

    await db.updateOne(
        { name: a.name },
        { $set: { email: "gustavo@email.com" }}
    )
    // let a = await db.findOne({name:"Gustavo"})
    // console.log(a.name)
}

module.exports = { updateBody }