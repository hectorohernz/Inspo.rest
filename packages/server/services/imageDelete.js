const aws = require("aws-sdk");
require('dotenv').config({path:__dirname + "../../.env"});

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: process.env.Region
});

const s3 = new aws.S3();

const deleteImage = (bucketName,imageKey) => {
    const objectSettings = {
        Bucket: bucketName,
        Key: imageKey
    };  
    console.log(objectSettings);
    s3.deleteObject(objectSettings, (err,data) => {
        if (err) {console.log(err); return err}
        else  {console.log(data); return data};
    });
}

module.exports = deleteImage;