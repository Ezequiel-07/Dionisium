const { Schema, model } = require('mongoose');

const language_schema = new Schema({
    name:{type:String, required:true},
    seasons:[{type:Object, ref:'season'}],
    seasonsN:{type:Number, default:0}
});

module.exports = model('language', language_schema);