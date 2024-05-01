const multer = require("multer");
//Storing Files on disk
const filestorage = multer.diskStorage({
  destination: "../Middlewares/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};
const upload = multer({ storage: filestorage, fileFilter: fileFilter }).any();

module.exports = upload;
