const Staff = require('../models/Staff');

class StaffController {
    // [GET] - /staff/ - get info
    index(req, res, next) {
        res.send('Nhân viên');
    }
    // [GET] - /staff/ - get form create staff
    create(req, res, next) {
        res.render('./staff/create',{
            layout:'admin'
        })
    }
    // [POST] - /staff/store - store new staff 
    store(req, res, next) {
       Staff.create({
            fullname :  req.body.fullname, 
            phoneNumber : req.body.phoneNumber,
            address :   req.body.address,
            position :   req.body.position,
            username : req.body.username,
            password : req.body.password,
       })
       .then(staff => {
           res.send('tạo thành công');
       })
       .catch(next);
    }
    // [Get] - /staff/login - Login
    login(req, res, next) {
        res.render('staff/login', {
            layout:''
        })
    }
    // [POST] -/staff/login - confirmLogin
    confirmLogin(req, res, next) {
        Staff.findOne({username: req.body.username},
            (err,staff) => {
                if(err)(next(err));
                if(staff) {
                    let pass = req.body.password;
                    if(staff.password === pass){
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

module.exports = new StaffController();