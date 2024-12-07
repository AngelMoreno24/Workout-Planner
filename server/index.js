const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.get("/api", (req, res) => {
    res.json({"users": ["a","b"]})
})

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})