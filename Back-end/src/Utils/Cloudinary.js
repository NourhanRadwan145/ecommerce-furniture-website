const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dh7osyxvl",
  api_key: "626725392863231",
  api_secret: "8pLMP2ffcE0651IgBlIR_SFPshY",
  secure: true,
});

const cloudUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve({ url: result.secure_url, id: result.public_id });
    });
  });
};

module.exports = cloudUpload;
