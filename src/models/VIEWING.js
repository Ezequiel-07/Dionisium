const { Schema, model } = require('mongoose');

const viewing_schema = new Schema({
    name:{type:String, required:true},
    redirect:{type:String, required:true},
    thumnail:{type:String, required:true},
    minute:{type:String, required:true}
});

module.exports = model('viewing', viewing_schema);