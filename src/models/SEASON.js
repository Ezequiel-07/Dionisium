const { Schema, model } = require('mongoose');

const season_schema = new Schema({
    name:{type:String, required:true},
    number:{type:Number, required:true},
    chapters:[{type:Object, ref:'chapter'}]
});

module.exports = model('season', season_schema);