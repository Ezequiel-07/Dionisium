const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const user_schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    date:{type:Date, default:Date.now()},
    roles:[{type:String, required:true}],
    plain:[{type:String, required:true}],
    viewing:[{type:Object, ref:'viewing'}],
    avatar:{type:String, default:'deku'}
});

user_schema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
}

user_schema.statics.comparePassword = async (encryptPassword, password) => {
    return await bcrypt.compare(password, encryptPassword);
}

module.exports = model('user', user_schema);