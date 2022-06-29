const express = require('express')

const { connection } = require('./mongodb')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.put('/user', async (req, res) => {
    let con = await connection()
    let db = await con.db().collection('teste')
    let result = await db.updateOne({a: req.body.nomes[0].name}, {$set: {b: "sadujsdau"}})
    res.send(req.body)
})

app.post('/user', async (req, res) => {
    console.log(req.body)
    let con = await connection()
    let db = await con.db().collection('teste')
    let result = await db.insertOne({a: req.body.nomes[0].name, c: 'd'})
    console.log(result)
    res.send()
})

app.delete('/user', (req, res) => {
    console.log(req.body)
    req.body.nomes.pop()
    res.send(req.body)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

