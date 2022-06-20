const Crypto = require("crypto-js");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
module.exports = (async function () {
  let gfs;
  let db;
  try {
    db = await mongoose.connect(process.env.MONGO_URI);
    gfs = await new mongoose.mongo.GridFSBucket(db.connection, {
      bucketName: "mediaBucket",
    });
    console.log(
      "🟢 MongoDB data base connected. If you want to access the database you can get it through db from this cofig file."
    );
  } catch (error) {
    console.log(`🔴 Failed to connect to MongoDB ${error}`);
  }

  const storageEngine = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (_req, file) => {
      return new Promise((resolve, reject) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
          resolve({
            filename: Crypto.lib.WordArray.random(128 / 8).toString(),
            bucketName: "mediaBucket",
          });

        reject(
          "File is not in the correct format. You can only upload image/jpeg, image/png"
        );
      });
    },
  });
  const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, true);
      else cb(null, false);
    },
  });

  const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("CORRECT STORAGE ENGINE INVOKED");
      const { type } = req.query;
      const { id } = req.params;
      const { filepath } = req.query;
      if (
        (file.mimetype === "video/mp4" && type === "trailer") ||
        type === "video"
      ) {
        const exists = fs.existsSync(filepath);
        if (exists) {
          fs.unlinkSync(filepath);
        }
        cb(null, "videos");
      } else cb(null, false);
    },
    filename: (_req, _file, cb) => {
      cb(null, Crypto.lib.WordArray.random(128 / 8).toString() + ".mp4");
    },
  });

  const uploadVideos = multer({
    storage: videoStorage,
    limits: {
      fileSize: 1024 * 1024 * 20, // 20 MB (max file size)
    },
  });

  return { upload, gfs, db, storageEngine, uploadVideos };
})();
