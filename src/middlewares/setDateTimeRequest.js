
const setDateTime = (req,res,next) => { 
    req.dateTime = new Date();
    return next();
};

module.exports = setDateTime;