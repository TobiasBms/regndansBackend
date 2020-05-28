const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./src/assets/",
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file,cb);
    }
}).single('myImage');

function checkFileType(file, cb){
    //Allow ext
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(mimeType && extName){
        return cb(null, true);
    }else{
        cb('Error: Images Only!');
    }
}
router.post("/", function(req,res) {
    upload(req,res, (err) => {
        if(err){
            res.end("Error");
        }else{
            console.log(req.file);
            res.end(`${req.file.filename}`);
        }
    });
});

module.exports = router;