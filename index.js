const multer =require('multer');
const express = require('express');
const BodyParser =require('body-parser');
const cloudinary =require('cloudinary');
const cloudinaryStorage =require('multer-storage-cloudinary');
const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended : false}));

cloudinary.config({
    cloud_name: 'connie19',
    api_key: '874837483274837',
    api_secret: 'a676b67565c6767a6767d6767f676fe1'
    });
    
    const cloudStorage = cloudinaryStorage({
      cloudinary: cloudinary,
      folder: "demo",
      allowedFormats: ["jpg", "png"],
      transformation: [{ width: 500, height: 500, crop: "limit" }]
      });

const upload = multer({storage : cloudStorage});

app.post('/images', upload.single('image'), (req, res) =>{
    console.log(req.file);
    const image = {}
    image.url = req.file.url;

    console.log('the url of the uploaded image is', image.url);

})

app.listen(1200, () =>{
    console.log('server started on port', 1200);
})


