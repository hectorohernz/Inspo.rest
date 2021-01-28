const UserInfo  = require("../../mongoose/schema/User-info");
const logger = require("../../utils/logger/logger");
const uploadImageToBucket = require("../services/imageUpload");
const singleUpload = uploadImageToBucket.single("image");


const uploadImage = async (req,res) => {
    let user = req.username
    let saveBody = {};
    try {
        saveBody.user = req.username;   // Username
        saveBody.meta = null; // Links
        singleUpload(req,res, async (err) => {
            if(err){
                return res.status(422).json(err);
            }
            saveBody.profileImageUrl =  req.file.location;
            let userInfo = new UserInfo(saveBody);
            await userInfo.save();       
            return res.status(200).json({
            status:true
        }) 
        });
    } catch (err) {
        return res.status(400).json({
            status:false,
            error:err.message
        }) 
    }
}

updateImage = () => {

};  


module.exports = {
    uploadImage
}