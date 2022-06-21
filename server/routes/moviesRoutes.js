const {
  createMovieController,
  deleteMovieController,
  findMovie,
  getRandomMovie,
  updateMovieController,
  getMediaAccessLink,
  findMovieList,
  deleteFileController,
  handleVideoFiles,
} = require("../controllers/movies.js");
const verifyToken = require("../middleware/verifyToken.js");
const router = require("./routerConfig.js");

require("../config/config.js").then(({ upload }) => {
  router.post(
    "/",
    [
      verifyToken,
      upload.fields([
        { name: "thumbnailImage", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 },
        { name: "titleImage", maxCount: 1 },
      ]),
    ],
    createMovieController
  );
});
router.put("/:id", verifyToken, updateMovieController);
router.delete("/:id", verifyToken, deleteMovieController);
router.get("/:id", verifyToken, findMovie);
router.post("/search/genre/skip/limit/", verifyToken, findMovieList);
router.get("/random/banner", verifyToken, getRandomMovie);
router.get("/accessLink/media/:filename", verifyToken, getMediaAccessLink);
router.delete("/delete/file/:id", verifyToken, deleteFileController);
/**
 * params: id
 * Query params: type= video || trailer
 */
require("../config/config.js").then(({ uploadVideos }) => {
  router.put(
    "/upload/videos/:id",
    [verifyToken, uploadVideos.single("video")],
    handleVideoFiles
  );
});

module.exports = router;
