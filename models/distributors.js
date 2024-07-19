const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributorSchema = new Schema({
    name : {type:String},
},{
    timestamps : true
})

module.exports = mongoose.model(`distributors` , distributorSchema);