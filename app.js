//Express errors
require('express-async-errors')

//Env data
require('dotenv').config()

//App
const express = require('express')
const app = express()

//Extract data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Start setup
const port = process.env.PORT || 3000;
const connectDb = require('./db/connectDB')

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => console.log(`The server is running on port ${port}`))
    } catch (error) {
        console.log('Failed to connect to Database')
    }
}

start()
