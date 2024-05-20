//Express errors
require('express-async-errors')

//Env data
require('dotenv').config()

//App
const express = require('express')
const app = express()

//Import routes
const loginRoute = require('./routes/loginRoute.js')
const appoimentRoute = require('./routes/appointmentRoute.js')
const barberRoute = require('./routes/barberRoute.js')
const serviceRoute = require('./routes/servicesRoute.js')

//Extract data from requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes middleware
const authToken = require('./middlewares/authToken.js')

//Publics
app.use('/login', express.static('./public/login/'))
app.use('/', express.static('./public/home/'))
app.use('/signUp', express.static('./public/signUp'))
app.use('/forgotPassword', express.static('./public/forgotPassword'))
app.use('/myAppoiments', express.static('./public/myAppoiments'))

//Extra securites
const cors = require('cors')

//Routes
app.use('/api/v1/auth', loginRoute)
app.use('/api/v1/appoiments', authToken,appoimentRoute)
app.use('/api/v1/barbers', authToken, barberRoute)
app.use('/api/v1/services', serviceRoute)

//Middlewares import
const errorHandler = require('./middlewares/errorHandler.js')
const notFound = require('./middlewares/notFound.js')

//Middlewares
app.use(errorHandler)
app.use(notFound)

//Security models
app.use(cors)

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
