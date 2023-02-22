const { Schema, model } = require('mongoose');

const serie_schema = new Schema({
    name:{type:String, required:true, unique:true},
    description:{type:String},
    thumnail:{type:String, required:true},
    lenguages:[{type:Object, ref:'language'}],
    user:{type:Schema.Types.ObjectId, ref:'admins', required:true},
    views:{type:Number, default:0},
    date:{type:String}, dateMs:{type:Number, default:Date.now()}
});

module.exports = model('serie', serie_schema);