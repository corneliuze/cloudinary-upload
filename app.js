const multer = require('multer');
const BodyParser = require('body-parser');
const express = require('express')
const app = express();
const fs =require('fs');
const cloudinary = require('cloudinary');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended : true}));

cloudinary.config({
    cloud_name: 'xxxxxxx',
    api_key: 'xxxxxxxxx',
    api_secret: 'xxxxxxxxx'

 });
    
    
    

const storage = multer.diskStorage({
    destination : function(req, file, cb){
     cb(null, 'upload/');
    },
    filename : function(req,file, cb){
        console.log(file)
        cb(null, file.originalname + new Date());

    }
})

const upload = multer({storage}).single('image');

app.post('/images', upload, (req, res) =>{
   
    // res.send(req.file);
    console.log('the file from multer is', req.file);
    const path = req.file.path;
    console.log('the path i want to post to cloudinary is', path);
     
    cloudinary.uploader.upload(path, (data) =>{
        console.log('the uploaded files are getting here', data);
        console.log('file uploaded to cloudinary', path)
                    fs.unlinkSync(path);
                    console.log('file uploaded to cloudinary', path)

                    console.log('the file from cloudinary is', data)
                    res.json(data);
                })
})

app.listen(9000, () =>{
    console.log('ok, server is running');
})