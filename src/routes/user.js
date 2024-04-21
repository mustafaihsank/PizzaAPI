"use strict";
/* -------------------------------------------------------
    USER ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const UserController = require("../controllers/user");
const permissions = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /users
router
  .route("/")
  .get(permissions.isAdmin, UserController.list)
  .post(UserController.create);
router
  .route("/:id")
  .get(permissions.isLogin, UserController.read)
  .put(permissions.isLogin, UserController.update)
  .patch(permissions.isLogin, UserController.update)
  .delete(permissions.isAdmin, UserController.delete);
/* ------------------------------------------------------- */
module.exports = router;
