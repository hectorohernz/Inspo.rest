const uploadImageToBucket = require("../services/imageUpload");

// Image will be the body reponse 
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