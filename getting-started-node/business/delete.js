const { connection } = require('../mongodb')

async function deleteBody(body) {
    let con = await connection()
    let db = con.db().collection('teste')

    db.find({}).toArray((err, result) => {
        if (err) throw err
        result = result.pop()

        db.deleteOne(result, (err, obj) => {
            if (err) throw err
            console.log('1 doc deleted')
        })
    })
}

module.exports = { deleteBody }