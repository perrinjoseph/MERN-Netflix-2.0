const {
  deleteUserController,
  findAllUsersController,
  findUserController,
  getUserStatsControleer,
  updateUserController,
  findIfUserIsSignedUp,
  addToMyList,
  getUsersMyList,
  removeMovieFromMyList,
} = require("../controllers/users.js");
const verifyToken = require("../middleware/verifyToken.js");
const router = require("./routerConfig.js");

router.get("/mylist/userid/:id", verifyToken, getUsersMyList);
router.put("/mylist/userid/:id", verifyToken, addToMyList);
router.delete("/mylist/userid/:id", verifyToken, removeMovieFromMyList);
router.put("/update/:id", verifyToken, updateUserController);
router.post("/find", findIfUserIsSignedUp);
router.get("/find/:id", verifyToken, findUserController);
router.delete("/delete/:id", verifyToken, deleteUserController);
router.get("/find", verifyToken, findAllUsersController);
router.get("/stats", verifyToken, getUserStatsControleer);

module.exports = router;
