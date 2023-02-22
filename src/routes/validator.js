const vld = {};
const req_body_libs = require('../libs/verify_req_body_libs');

vld.validator = (req, res, next) => {
    if(req.headers.token != process.env.JWT_KEY){
        return res.status(401).json({message:'you is not authorized'});
    }
    const req_body_result = req_body_libs.index(req.body);
    if(req_body_result == false){return res.status(401).json({error:'some fields are inconplete'});}
    next();
}

module.exports = vld;