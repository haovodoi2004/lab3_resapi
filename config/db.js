const localConnectString = "mongodb://localhost:27017/DbRestApi"
const mongoose = require('mongoose')
mongoose.set("strictQuery", true)

const connect = async () => {
    try {
        await mongoose.connect(localConnectString)
        console.log("Connected successfully")
    }
    catch (e){
        console.log("Error :" + e)
    }
}
module.exports = {connect}