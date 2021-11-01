module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        res.cookie('sessionId',"heheheheheheh", {signed:true});
    }
    next()
}