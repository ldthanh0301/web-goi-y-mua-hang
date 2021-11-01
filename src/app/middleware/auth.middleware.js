module.exports.requireAuth = function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        res.redirect('/auth/admin/login');
        return
    } 
    next()
}