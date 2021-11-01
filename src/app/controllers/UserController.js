const User = require('../models/User');

class UserController {
    // [GET] - /user/ - get info
    index(req, res, next) {
        res.send('Nhân viên');
    }
    // [GET] - /user/ - get form create user
    register(req, res, next) {
        res.render('user/register',{
            layout:''
        })
    }
    // [POST] - /user/store - store new user 
    store(req, res, next) {
        User.create({
            fullname :  req.body.fullname, 
            phoneNumber : req.body.phoneNumber,
            address :   req.body.address,
            username : req.body.username,
            password : req.body.password,
       })
       .then(user => {
           res.render('user/register',{
                layout:'',
                isdefined:true,
                status:1,
                message:'Tạo thành công'
            });
       })
       .catch(next);
    }
    // [Get] - /user/login - Login
    login(req, res, next) {
        res.render('user/login', {
            layout:''
        })
    }
    // [POST] -/user/login - confirmLogin
    confirmLogin(req, res, next) {
        User.findOne({username: req.body.username},
            (err,user) => {
                if(err)(next(err));
                if(user) {
                    let pass = req.body.password;
                    if(user.password === pass){
                        res.render('admin/products-stored.hbs',{
                            layout:'admin'
                        })
                    } else {
                        res.send('Tài khoản hoặc mật khẩu không đúng')
                    }
                }else {
                    res.send('Tài khoản hoặc mật khẩu không đúng')
                }
            })
    }
}

module.exports = new UserController();