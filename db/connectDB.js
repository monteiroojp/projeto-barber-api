const mongose = require('mongoose')

//ConnectDB function
const connectDb = async (url) => {
    return mongose.connect(url)
}

module.exports = connectDb