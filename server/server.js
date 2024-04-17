import express from "express";
import cors from "cors";
import multer from "multer";
import {v2 as cloudinary} from 'cloudinary';
import  fs from "fs"
const app = express();
import dotenv from "dotenv";

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
// Configure Multer for disk storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})

//upload-middleware
const upload = multer({ storage: storage })


          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUDINNERY_API_KEY, 
  api_secret: process.env.CLOUDINNERY_SECRIT 
});




app.get("/",(req,res) =>{
  res.send("Hello World 2")
});
app.post("/api/upload",upload.single("image"),(req,res) =>{
  // res.json({ filename: req.file.filename });
  // If using Cloudinary
 try {
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Upload to Cloudinary failed' });
    }
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
   return res.json({ url: result.url });
  });
 } catch (error) {
  console.log("error",error);
  res.json({ error:error });
  
 }
});

app.post("/api/multipleUpload", upload.array('files', 10), async (req, res) => {
  try {
    // If using disk storage
    const filenames = req.files.map((file) => file.filename);
   
    // If using Cloudinary
    const urls = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file);
      urls.push(url);
    }
    // Function to upload a single file to Cloudinary
 

    res.json({ filenames, urls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  
  const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          console.log("error",error);
          reject("Upload to Cloudinary failed");
        } else {
          resolve(result.url);
        }
      });
    });
  };