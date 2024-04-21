"use strict";
/* -------------------------------------------------------
    TOKEN ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const TokenController = require("../controllers/token");
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /tokens
router.use(isAdmin);
router.route("/").get(TokenController.list).post(TokenController.create);
router
  .route("/:id")
  .get(TokenController.read)
  .put(TokenController.update)
  .patch(TokenController.update)
  .delete(TokenController.delete);
/* ------------------------------------------------------- */
module.exports = router;
