const movieModel = require("../models/movie.js");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

const createMovieController = async (req, res) => {
  const fileExists = (pathname) => {
    const file = req.files[pathname] ? req.files[pathname][0] : -1;
    if (file !== -1) return file;
    throw `A file for ${pathname} does not exist. error`;
  };

  if (req.user.isAdmin) {
    try {
      const newMovie = new movieModel({
        ...req.body,
        thumbnailImage: fileExists("thumbnailImage"),
        bannerImage: fileExists("bannerImage"),
        titleImage: fileExists("titleImage"),
      });
      const response = await newMovie.save();
      res.status(201).json(response._doc);
    } catch (err) {
      res.status(500).json({ error: `Could not create a movie: ${err}` });
    }
  } else {
    res.status(400).json({ error: "Only Admins can create movies." });
  }
};

const updateMovieController = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await movieModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(400).json({ error: "Could not update the movie.", err });
    }
  } else {
    res.status(400).json({ error: "Only Admins can update movies." });
  }
};

const deleteMovieController = async (req, res) => {
  /** Whenever you make a query with a mongoose model, it will return you a mongoose instance
   * which has some extra meta data in it. So if you tried to read the documents
   * you will get the meta data attached to it, so it wont be possible to pull out the specific documents
   * This is why we use lean.exec it will return the exact response if you want to iterate and read some files.
   * Keep in mind that you wont be able to use any mongoose chainned events such as save() etc on this returned "response"
   * whhich comes in the 2nd parameter of the .exec callback.
   *  link: https://stackoverflow.com/questions/59475327/mongoosejs-find-returning-whole-model-instead-of-document
   * NOTE: add this feature later. Basically you need to create a new role. Admin is the highest. Then we should have creators and a customer.
   * because at the moment only the admin is allowed to create a movie for the creators.
   */
  if (req.user.isAdmin) {
    try {
      movieModel
        .findByIdAndDelete(req.params.id)
        .lean()
        .exec((_err, response) => {
          if (!response) {
            return res.status(400).json({
              error: `A movie with id ${req.params.id} does not exist.`,
            });
          }
          const deleteFileHelper = (id, filename) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                require("../config/config.js").then(({ gfs }) => {
                  gfs.delete(
                    new mongoose.Types.ObjectId(id),
                    (fileDeletionErr, _theFile) => {
                      if (fileDeletionErr) {
                        reject(
                          `An error eccurred when deleting the*${filename}*${fileDeletionErr.message}`
                        );
                      } else {
                        const { video } = response;
                        const { trailer } = response;

                        const videoExists = fs.existsSync(video);
                        const trailerExists = fs.existsSync(trailer);

                        if (videoExists) {
                          console.log("I deleted the video");
                          fs.unlinkSync(video);
                        }
                        if (trailerExists) {
                          fs.unlinkSync(trailer);
                        }
                        resolve();
                      }
                    }
                  );
                });
              }, 0);
            });
          };
          /** One new thing noticed here is when you do .map for a promise filled array. It will set the array with the total length of what every you are trying to map over.
           * so you will get the entire length of the response (basically all their properties even the ones that done satisfy the condition)
           * in the promise array("allPromises") for example [undefined,undefined,undefined,DATA,DATA,DATA]
           * This is why I did a filter so I can remove the non computable properties so that my .map will only use those filtered properties
           * to generate promises.
           */
          const allPromises = Object.values(response)
            .filter((el) => typeof el === "object" && el.mimetype && el.id)
            .map((doc) => {
              return deleteFileHelper(doc.id, doc.filename);
            });

          const results = Promise.all(allPromises);
          results.then((data) =>
            data.every((error) => error === undefined)
              ? res.status(200).json({ message: "Movie deleted!" })
              : res.status(400).json({
                  error:
                    "An error while deleting your Movie. 1 or more files were not found. Please contact support.",
                  err: data,
                })
          );
        });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Could not delete movie.", err });
    }
  } else {
    res.status(400).json({ error: "Only Admins can delete movies." });
  }
};

const findMovie = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (movie) res.status(200).json(movie);
    else
      res
        .status(400)
        .json({ error: "The movie you are looking for does not exist." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not find movie", err });
  }
};

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    4;
    if (type === "series") {
      movie = await movieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await movieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMediaAccessLink = async (req, res) => {
  const filename = req.params.filename;
  const type = req.query?.type;
  if (type !== "video" && type !== "trailer") {
    console.log(type);
    if (!filename) {
      res.status(400).json({ error: "Please provide a file name" });
    }
    require("../config/config.js").then(({ gfs }) => {
      gfs.find({ filename }).toArray((err, files) => {
        if (files.length === 0) {
          return res.status(400).json({
            error: "The thumbnail is not available in the file storage.",
            err,
          });
        }
        if (
          files[0].contentType === "image/png" ||
          files[0].contentType === "image/jpeg"
        ) {
          gfs.openDownloadStreamByName(filename).pipe(res);
        } else {
          res.status(400).json({
            error:
              "Found the file, but the file is not of the format that we accept to show in the browser",
          });
        }
      });
    });
  } else {
    const { path } = req.query;
    if (!path || path === "undefined")
      return res.status(400).json({
        error: "Path needs to be provided in the query to fetch a movie",
      });
    //for somereason path with \ did not work in mac so
    //I changed it to / and it worked both in mac and windows...
    const newPath = path.replace("\\", "/");
    const pathExists = fs.existsSync(newPath);
    if (!pathExists) {
      return res.status(400).json({
        error: "There is no such movie or traler path in the storage.",
      });
    }
    const stat = fs.statSync(newPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1; // no idea why filesize -1
      const chunksize = end - start + 1;
      const file = fs.createReadStream(newPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(newPath).pipe(res);
    }
  }
};

const findMovieList = async (req, res) => {
  const limit = req.query.limit || 0;
  const skipRecords = req.query.skip || 0;
  const genre = req.query.genre;

  try {
    const movies = await movieModel
      .find(genre === "allGenres" ? {} : { genre: genre })
      .skip(skipRecords)
      .limit(limit);
    return res.status(200).json(movies);
  } catch (err) {
    res
      .status(400)
      .json({ error: "The movies you are looking do not exist.", err });
  }
};

const deleteFileController = (req, res) => {
  const id = req.params.id;
  if (id) {
    require("../config/config.js").then(({ gfs }) => {
      try {
        gfs.delete(new mongoose.Types.ObjectId(id), (err, file) => {
          if (err)
            res.status(400).json({
              error: "An error took place while trying to delete the file",
              err: err.message,
            });
          else
            res.status(200).json({ message: "Deleted the file successfully" });
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          error:
            "The requested movie cannot be deleted because the id is ivalid.",
        });
      }
    });
  }
};

const handleVideoFiles = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  const path = req.file?.path;
  console.log(path, type, id);
  const mimetype = req.file?.mimetype;
  if (req.user.isAdmin) {
    if (mimetype !== "video/mp4" || !mimetype || !path)
      return res.status(400).json({
        error: "The video files were in the wrong format. We only accept .mp4",
      });
    try {
      const response = await movieModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        { $set: { [type]: path } },
        { new: true }
      );
      if (response) res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ error: "Could not save files successfully.", err });
    }
  } else
    res
      .status(400)
      .json({ error: "Only admins can create and update movies." });
};

module.exports = {
  createMovieController,
  updateMovieController,
  deleteMovieController,
  findMovie,
  getRandomMovie,
  getMediaAccessLink,
  findMovieList,
  deleteFileController,
  handleVideoFiles,
};
