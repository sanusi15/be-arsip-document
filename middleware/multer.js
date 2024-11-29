const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Mendapatkan ekstensi file
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Nama file unik dengan ekstensi
  }
});

const upload = multer({ storage });

module.exports = upload;
