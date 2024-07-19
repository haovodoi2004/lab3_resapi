const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const Shema = mongoose.Schema

const Fruits = new Schema({
    name : {type: String},
    quantity : {type: Number},
    price : {type: Number},
    status :{type : Number}, // 1 -> con hang , 2 -> het hang , 3 -> dung ban
    image : {type: Array} ,
    description : {type: String},
    id_distributor:{type : Schema.Types.ObjectId, ref : 'distributors'},
},{
    timestamps: true
})
module.exports = mongoose.model(`fruits` , Fruits)