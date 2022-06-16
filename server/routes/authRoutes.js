const {
  authenticateUserController,
  loginController,
  logoutUserController,
  registerController,
} = require("../controllers/auth.js");
const verifyToken = require("../middleware/verifyToken.js");
const router = require("./routerConfig.js");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/authenticate", verifyToken, authenticateUserController);
router.post("/logout", verifyToken, logoutUserController);

module.exports = router;
