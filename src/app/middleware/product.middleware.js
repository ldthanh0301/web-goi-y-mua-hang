const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/../public/img/products/'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now().toString().slice(5);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});
const  upload = multer({storage: storage});

module.exports.upload = upload;

module.exports.changePath = function(req,res,next) {
    let path = req.files.map(file => {
      let path =file['path']
      path = path.split('public');
      path =path.pop();
      return path;
    });
    req.body.images = path;
    next();
};

