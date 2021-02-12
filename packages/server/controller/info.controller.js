const logger = require("../../utils/logger/logger");
const uploadImageToBucket = require("../services/imageUpload");
const singleUpload = uploadImageToBucket.single("image");
const UserInfoImage = require("../../mongoose/schema/User-info-image");
const UserInfo = require("../../mongoose/schema/User-info");

const uploadImage = async (req,res) => {
    try {
        singleUpload(req,res, async (err) => {
            if(err){
                return res.status(422).json(err);
            }

            let imagePath = req.file.location;
            let UserImage = new UserInfoImage({
                imagePath: imagePath
            });
            await UserImage.save();
            await UserInfo.findOneAndUpdate({user: req.id}, {profileImageUrl: UserImage._id});
            return res.status(200).json({
            message:"Image Successfully Updated",
            status:true
        }) 
        });
    } catch (err) {
        return res.status(400).json({
            status:false,
            message:err.message
        }) 
    }
};

const updateLinks = async (req,res) => {
    try {
        let linkArray = req.body.meta;
        console.log(linkArray);
        await UserInfo.findOneAndUpdate({user: req.id}, {meta: linkArray});
        return res.status(200).json({
            message:"Links Successfully Updated",
            status:true
        }) ;
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:error.message
        }); 
    }
};  



module.exports = {
    uploadImage,
    updateLinks
}