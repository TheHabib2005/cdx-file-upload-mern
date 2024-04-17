// import { v2 as cloudinary } from "cloudinary";

//  const handleMultipleUploads = async (req, res) => {
//   try {
//     // If using disk storage
//     const filenames = req.files.map((file) => file.filename);

//     // If using Cloudinary
//     const urls = [];
//     for (const file of req.files) {
//       const url = await uploadToCloudinary(file);
//       urls.push(url);
//     }
//     // Function to upload a single file to Cloudinary
//     const uploadToCloudinary = async (file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.path, (error, result) => {
//           if (error) {
//             reject("Upload to Cloudinary failed");
//           } else {
//             resolve(result.url);
//           }
//         });
//       });
//     };

//     res.json({ filenames, urls });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };
