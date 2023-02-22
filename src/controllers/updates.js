const ctrl = {};
const serie_model = require('../models/SERIE');
const serie_cover_model = require('../models/SERIE_COVER');
const user_model = require('../models/USERS');
const jwt_libs = require('../libs/jsonwebtoken_config');

ctrl.views = async (req, res)=>{
    try {
        const { serie_id, cover_id } = req.body;
        const serieCoverFound = await serie_cover_model.findByIdAndUpdate(cover_id, {views: 1}); await serieCoverFound.updateOne({views: (serieCoverFound.views + 1)});
        const serieFound = await serie_model.findById(serie_id); await serieFound.updateOne({views: (serieFound.views + 1)});
        return res.status(200).json({message:'update'});
    } catch (error) {
        res.status(400).json({error:'error unexpected'});
        console.log(error);
    }
}

ctrl.viewing = async (req, res)=>{
    try {
        const { name, thumnail, redirect, minute, token } = req.body;
        const decoded = await jwt_libs.verify(token);
        if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
        const userFound = await user_model.findById(decoded._id);
        let status = false; await userFound.viewing.map(element => {if(element.redirect == redirect){status = true}});
        if(status == true){return res.status(200).json({message:'not update'});}
        await userFound.updateOne({$push:{viewing:{name, thumnail, redirect, minute}}});
        res.status(200).json({message:'update'});
    } catch (error) {
        res.status(400).json({error:'error unexpected'});
        console.log(error);
    }
}

module.exports = ctrl;