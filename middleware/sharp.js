const sharp = require("sharp");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(err, false);
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadProductsImage = upload.fields([
  {
    name: "images",
    maxCount: 3,
  },
]);

exports.resizeProductsImages = async (req, res, next) => {
  console.log(req.files.images);
  if (!req.files.images) return next();
  req.body.images = [];
  await Promise.all(
    req.files?.images.map(async (file) => {
      const filename = `${v4()}.jpeg`;
      await sharp(file.buffer)
        .resize(640, 640)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, "../public", "images", "productImages", filename));

      req.body.images.push(filename);
    })
  );
  next();
};
