const fileUpload = require('express-fileupload')
const path = require('path')
const {StatusCodes} = require("http-status-codes")
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2

//this function will take the incoming file and save it to the local folder
const uploadProductImageLocal = async (req, res) =>{

    //check for file
    if(!req.files.image){
        throw new CustomError.BadRequestError('Image file has not been provided')
    }

    const productimage = req.files.image
    //check if file is an image
    if(!productimage.mimetype.startsWith("image")){
        throw new CustomError.BadRequestError('File uploaded is not an image')
    }
    
    //check the file size of file is less then 1MB
    if(productimage.size > 1024*1024){
        throw new CustomError.BadRequestError('File uploaded is larger then 1MB')
    }

    const imagePath = path.join(__dirname, '../public/uploads/'+req.files.image.name)
    await productimage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:{src:`/uploads/${req.files.image.name}`}})
}

//this function will save the incoming file into a temp folder and 
//then the file is sent to cloudinary to save it
const uploadProductImage = async (req,res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename: true,
        folder:'file-upload',
    })

    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}

module.exports = {uploadProductImage}