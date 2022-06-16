const Crypto = require("crypto-js");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// try {
//   db = mongoose.connect(process.env.MONGO_URI).then((db) => {
//     gfs = new mongoose.mongo.GridFSBucket(db.connection, {
//       bucketName: "mediaBucket",
//     });
//     console.log(
//       "🟢 MongoDB data base connected. If you want to access the database you can get it through db from this cofig file."
//     );
//   });
// } catch (error) {
//   console.log(`🔴 Failed to connect to MongoDB ${error}`);
// }

// const storageEngine = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (_req, file) => {
//     return new Promise((resolve, reject) => {
//       if (
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png" ||
//         file.mimetype === "video/mp4"
//       )
//         resolve({
//           filename: Crypto.lib.WordArray.random(128 / 8).toString(),
//           bucketName: "mediaBucket",
//         });

//       reject(
//         "File is not in the correct format. You can only upload image/jpeg, image/png, video/mp4"
//       );
//     });
//   },
// });

// const upload = multer({ storage: storageEngine });
// module.exports = { upload, storageEngine, gfs };

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
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "video/mp4"
        )
          resolve({
            filename: Crypto.lib.WordArray.random(128 / 8).toString(),
            bucketName: "mediaBucket",
          });

        reject(
          "File is not in the correct format. You can only upload image/jpeg, image/png, video/mp4"
        );
      });
    },
  });
  const upload = multer({ storage: storageEngine });
  return { upload, gfs, db, storageEngine };
})();
