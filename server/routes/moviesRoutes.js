const {
  createMovieController,
  deleteMovieController,
  findMovie,
  getRandomMovie,
  updateMovieController,
  getMediaAccessLink,
  findMovieList,
  deleteFileController,
} = require("../controllers/movies.js");
const verifyToken = require("../middleware/verifyToken.js");
const { route } = require("./routerConfig.js");
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
        { name: "video", maxCount: 1 },
        { name: "trailer", maxCount: 1 },
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

module.exports = router;
