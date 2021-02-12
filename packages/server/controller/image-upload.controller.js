const uploadImageToBucket = require("../services/imageUpload");
const singleUpload = uploadImageToBucket.single("image");

const uploadImage = (req,res) => {
    singleUpload(req,res, (err) => {
        if(err){
            return err
        }
        return {"imageUrl": req.file.location}
    });
};  

module.exports = uploadImage;