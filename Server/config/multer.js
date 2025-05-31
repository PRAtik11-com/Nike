const multer = require("multer");
const fs = require("node:fs");
const folderName = "./uploads";
const userfolderName = `${folderName}/user`;
const productfolderName = `${folderName}/product`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);

        if (!fs.existsSync(userfolderName)) {
          fs.mkdirSync(userfolderName);

        }
        if (!fs.existsSync(productfolderName)) {
          fs.mkdirSync(productfolderName);
        }

      }
     
      if (file?.fieldname == "profileImage") {
        cb(null, userfolderName);
      } else if (file.fieldname == "productImage") {
        cb(null, productfolderName);
      }else{
        cb(new Error("Invalid field name"), null);
      }
    } catch (err) {
      console.error(err);
    }
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
