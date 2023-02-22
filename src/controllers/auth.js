const ctrl = {};
const users_model = require('../models/USERS');
const jwt_libs = require('../libs/jsonwebtoken_config');

ctrl.signup = async (req, res)=>{
    const {name, email, password} = req.body;
    const userFound = await users_model.findOne({email});

    if(userFound){return res.status(401).json({error:'the email already is use'});}
    if(password.length < 8){return res.status(401).json({error:'the password is too short'});}

    const user = users_model({
        name,
        email,
        password: await users_model.encryptPassword(password),
        roles:'user',
        plain:'started pack'
    });
    await user.save();

    const token = await jwt_libs.sing(user._id);
    return res.status(200).json({token:token, plain:user.plain, avatar:user.avatar});
}

ctrl.withGoogle = async (req, res)=>{
    try {
        const {name, email, id} = req.body;
        const userFound = await users_model.findOne({email});
        if(userFound){
            const token = await jwt_libs.sing(userFound._id);
            return res.status(200).json({token:token, plain:userFound.plain, avatar:userFound.avatar});
        }

        const user = users_model({
            name,
            email,
            password: await users_model.encryptPassword(id),
            roles:'user',
            plain:'started pack'
        });
        await user.save();
    
        const token = await jwt_libs.sing(user._id);
        return res.status(200).json({token:token, plain:user.plain, avatar:user.avatar});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'error unexpected'});
    }
}

ctrl.signin = async (req, res)=>{
    const {email, password} = req.body;
    const userFound = await users_model.findOne({email});
    if(!userFound){return res.status(401).json({error:'the email or password are incorrect'});}
    const result = await users_model.comparePassword(userFound.password, password);
    if(result == false){return res.status(401).json({error:'the email or password are incorrect'});}

    const token = await jwt_libs.sing(userFound._id);
    return res.status(200).json({token:token, plain:userFound.plain, avatar:userFound.avatar});
}

ctrl.verify = async (req, res)=>{
    try {
        const { token } = req.body;
        const decoded = await jwt_libs.verify(token);
        if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
        const userFound = await users_model.findById(decoded._id);
        const newtoken = await jwt_libs.sing(decoded._id);
        return res.status(200).json({token:newtoken, plain:userFound.plain, avatar:userFound.avatar});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'error unexpected'});
    }
}

ctrl.changeAvatar = async (req, res)=>{
    try {
        const { token, avatar } = req.body;
        const decoded = await jwt_libs.verify(token);
        if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
        await users_model.findByIdAndUpdate(decoded._id, {avatar:avatar});
        res.status(200).json({message:'update'});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'error unexpected'});
    }
}

module.exports = ctrl;