module.exports.requireAuth = function(req, res, next) {
    if(!req.signedCookies.sessionAdminId && req.originalUrl !=='/admin/login' ) {
        console.log(req.originalUrl)
        res.redirect('/admin/login');

        return
    } 
    
    next()
}