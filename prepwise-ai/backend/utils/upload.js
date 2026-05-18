const multer = require("multer");
const path = require("path");

//  STORAGE
const storage = multer.diskStorage({

  destination: "./uploads/",

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

//  FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ];

  // ✅ VALID FILE
  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, DOC and DOCX files are allowed"
      ),
      false
    );
  }
};

//  EXPORT MULTER
module.exports = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

});