const Staff = require('../models/Staff');
const User = require('../models/User');


module.exports.loginAdmin = function(req, res, next) {
    res.render('auth/loginAdmin', {
        layout:''
    });
}

module.exports.loginUser = function(req, res, next) {
    res.render('auth/loginUser', {
        layout:''
    });
}


module.exports.confirmStaffLogin  = (req, res, next) => {
    Staff.findOne({username: req.body.username},
        (err,staff) => {
            if(err){
                next(err)
                return
            }
            if(!staff) {
                res.send('Tài khoản hoặc mật khẩu không đúng')
                return
            }
            if(staff.password !== req.body.password){
                res.send('Tài khoản hoặc mật khẩu không đúng')
                return
            } else {
                res.cookie('sessionId',staff.username, {signed:true});
                req.session.staff = staff;
                res.redirect('/admin/');
            }
        })
}

module.exports.confirmUserLogin  = (req, res, next) => {
    User.findOne({username: req.body.username},
        (err,user) => {
            if(err){
                next(err)
                return
            }
            if(!user) {
                res.send('Tài khoản hoặc mật khẩu không đúng')
                return
            }
            if(user.password !== req.body.password){
                res.send('Tài khoản hoặc mật khẩu không đúng')
                return
            } else {
                res.cookie('sessionId',user.username, {signed:true});
                req.session.user = user;
                res.redirect('/');
            }
        })
}

// logoutUser
module.exports.logoutUser  = (req, res, next) => {
    res.clearCookie('sessionId')
    req.session.destroy()
    res.redirect('/user/login')
}


