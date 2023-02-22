const { Schema, model } = require('mongoose');

const chapter_schema = new Schema({
    name:{type:String, required:true},
    number:{type:Number, required:true},
    description:{type:String, required:true},
    secure_url:{type:String, required:true},
    thumnail:{type:String, required:true},
    duration:{type:Number, required:true},
    season:{type:Schema.Types.ObjectId, required:true, ref:'season'},
    serie:{type:String, required:true}
});

module.exports = model('chapter', chapter_schema);