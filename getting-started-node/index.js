const express = require('express')

const { connection } = require('./mongodb')
const { body, validationResult } = require('express-validator')
const { insertBody } = require('./business/insert')
const { deleteBody } = require('./business/delete')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/user', async (req, res) => {
    res.send(req.body)
})

// create members
app.post('/user',
    body('members.*.name').isString(),
    body('members.*.email').isEmail(),
    body('members.*.age').isInt().optional(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
    }
    let result = await insertBody(req.body)
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
    let result = await deleteBody(req.body)
    res.send()
})

// 404
app.use(async (req,res) => {
    res.status(404).send('Page not found')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

