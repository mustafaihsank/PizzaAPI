"use strict";
/* -------------------------------------------------------
    USER ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const UserController = require("../controllers/user");
/* ------------------------------------------------------- */
// URL: /users
router.route("/").get(UserController.list).post(UserController.create);
router
  .route("/:id")
  .get(UserController.read)
  .put(UserController.update)
  .patch(UserController.update)
  .delete(UserController.delete);
/* ------------------------------------------------------- */
module.exports = router;
