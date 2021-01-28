const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config({path:__dirname + "../../.env"});

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: process.env.Region
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
  }

const getExtention = (file) => {
    if (file.mimetype === 'image/jpeg') {
       return ".jpeg"
    } else if( file.mimetype === 'image/png'){
        return ".png"
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl:"public-read",
        bucket: "inspoimages",   
        metadata: (req,file,cb) => {
            cb(null, {fieldName: "Test_data_!"})
        },
        key: (req,file,cb) => {
            cb(null,Date.now().toString() + getExtention(file));
        }
    })
})

module.exports =  upload;
