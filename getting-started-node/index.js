const express = require('express')

const { connection } = require('./mongodb')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// create members
app.post('/user', async (req, res) => {
    let con = await connection()
    let db = con.db().collection('teste')
    req.body.members.forEach(e => {
        db.insertOne({name: e.name, last_name: e.last_name})
        console.log(e)
    });

    // let result = await db.insertOne({name: req.body.members[0].name, last_name: ''})
    res.send()
})

// UPDATE
app.put('/user', async (req, res) => {
    let con = await connection()
    let db = con.db().collection('teste')
    let a = await db.findOne({name: "Gustavo"})
    let result = await db.updateOne(
        {name: a.name},
        {$set: {name: "Marcos", last_name: "Souza"}}
    )
    // let a = await db.findOne({name:"Gustavo"})
    // console.log(a.name)
    res.send()
})

// DELETE
app.delete('/user', async (req, res) => {
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
    res.send()
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

