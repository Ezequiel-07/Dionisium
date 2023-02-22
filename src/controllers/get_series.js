const ctrl = {};
const serie_model = require('../models/SERIE');
const serie_cover_model = require('../models/SERIE_COVER');
const language_model = require('../models/LANGUAGE');
const season_model = require('../models/SEASON');
const chapter_model = require('../models/CHAPTER');
const user_model = require('../models/USERS');
const jwt_libs = require('../libs/jsonwebtoken_config');

ctrl.getSerieCover = async (req, res)=>{
    const mostNew = await serie_cover_model.find().sort({dateMs:-1}).limit(10);
    const mostPopular = await serie_cover_model.find().sort({views:-1}).limit(10);
    const shonen = await serie_cover_model.find({gender:'shonen'}).limit(10);
    const seinen = await serie_cover_model.find({gender:'seinen'}).limit(10);
    const spanish = await serie_cover_model.find({languages:'español'}).limit(10);
    const fiveSeasons = await serie_cover_model.find().sort({seasons:-1}).limit(10);
    let number = (Math.random() * 10).toFixed(); const popular_preview = [mostPopular[number], mostNew[number]];
    console.log(number);

    res.status(200).json({mostNew, mostPopular, shonen, seinen, spanish, fiveSeasons, popular_preview});
}

ctrl.getSerie = async (req, res)=>{
    try {
        const { serie_id } = req.body;
        const serieCoverFound = await serie_cover_model.findById(serie_id);
        const serieFound = await serie_model.findById(serieCoverFound.serie);
        res.status(200).json({serie:serieFound});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

ctrl.getLanguage = async (req, res)=>{
    try {
        const {id} = req.body;
        const languageFound = await language_model.findById(id);
        res.status(200).json({language:languageFound});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

ctrl.getSeason = async (req, res)=>{
    try {
        const {id} = req.body;
        const seasonFound = await season_model.findById(id);
        res.status(200).json({season:seasonFound});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

ctrl.getChapter = async (req, res)=>{
    try {
        const {id} = req.body;
        const chapterFound = await chapter_model.findById(id);
        res.status(200).json({chapter:chapterFound});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

ctrl.search = async (req, res)=>{
    try {
        const {search} = req.body;
        const serieFound = await serie_cover_model.find({name:RegExp(search)}).limit(5);
        const chaptersFound = await chapter_model.find({name:RegExp(search)}).limit(5);
        res.status(200).json({series:serieFound, chapters:chaptersFound});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

ctrl.getViewing = async (req, res)=>{
    try {
        const {token} = req.body;
        const decoded = await jwt_libs.verify(token);
        if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
        const userFound = await user_model.findById(decoded._id);
        res.status(200).json({viewing:userFound.viewing.slice(0, 3)});
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'error unexpected'});
    }
}

module.exports = ctrl;