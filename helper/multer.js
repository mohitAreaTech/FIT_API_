const multer = require("multer");
const Path = require("path");
const fs = require("fs");
const path = require("path");

exports.UploadFile = async (req, folder = "/") => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `assets/${folder}`);
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
    },
  });

  var upload = multer({ storage: storage }).any();
  return new Promise((resolve, reject) => {
    upload(req, (res = null), async function (err) {
      if (err) reject(err);
      if (req.files) {
          console.log("sdad")
        const length = req.files.length;
        if (length == 1) {
            console.log("sdad")
          resolve({
            body: req.body,
            file: req.files.map((image) => {
              let path = process.env.multer + image.path;
              return { ...image, path: path };
            }),
          });
        } else {
            console.log("sdad")
          resolve({
            body: req.body,
            file: req.files.map((image) => {
              let path = process.env.multer + image.path;
              return { ...image, path: path };
            }),
          });
        }
      }
    });
  });
};

exports.removeFile = (file) => {
  if (!file) {
    console.log("no file");
    return;
  }
  const path = Path.join(
    __dirname,
    "../",
    file.replace(process.env.multer, "")
  );
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    return "success";
  }
  return "doesn't exist";
};


exports.processAndSaveFiles = async(images, uniquePolicyId) => {
  const uploadedFiles = [];

  for (const fileData of images) {
      const { fieldname, image } = fileData;

      if (image && image.preview) {
          // Save the file to the assets/documents folder
          const filePath = path.join(__dirname, '..', '..', 'assets', 'documents', `${fieldname}_${uniquePolicyId}.jpeg`);

          // Log the preview value
          console.log('Preview:', image.preview);

          try {
              // Decode base64 string to binary
              const imageBuffer = Buffer.from(image.preview.split(',')[1], 'base64');

              // Write binary data to file
              fs.writeFileSync(filePath, imageBuffer, 'binary');

              // Return the file path or other relevant information
              uploadedFiles.push({ fieldname, filePath });
          } catch (error) {
              console.error(`Error processing file for fieldname: ${fieldname}`);
              console.error(error);
          }
      } else {
          // Handle the case where image or image.preview is not defined
          console.error(`Preview not defined for fieldname: ${fieldname}`);
      }
  }

  return uploadedFiles;
}
