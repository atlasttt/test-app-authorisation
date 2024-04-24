const Router = require("express").Router;
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("username").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.login
);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/users/me", authMiddleware, userController.getMe);
router.patch(
  "/users/:id",
  body("username").isLength({ min: 3, max: 32 }),
  authMiddleware,
  userController.editUser
);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
