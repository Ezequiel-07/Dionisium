const { Schema, model } = require('mongoose');

const serie_cover_schema = new Schema({
    name:{type:String, required:true},
    thumnail:{type:String, required:true},
    serie:{type:Schema.Types.ObjectId, ref:'serie', required:true},
    views:{type:Number, default:0},
    gender:{type:Array, required:true},
    date:{type:String}, dateMs:{type:Number, default:Date.now()},
    languages:[{type:String}],
    seasons:{type:Number, default:0}
});

module.exports = model('serie_cover', serie_cover_schema);