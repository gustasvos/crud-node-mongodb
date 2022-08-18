const express = require('express')

// const { connection } = require('./mongodb')
const { body, validationResult } = require('express-validator')
const { insertBody } = require('./model/insert')
const { deleteBody } = require('./model/delete')
const { updateBody } = require('./model/update')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/user', async (req, res) => {
    res.send()
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
app.put('/user',
    body('members.*.name').isString().optional(),
    body('members.*.email').isEmail().optional(),
    body('members.*.age').isInt().optional(),
    async (req, res) => {
        let result = await updateBody(req.body)
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

