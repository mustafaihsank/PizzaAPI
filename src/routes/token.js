"use strict";
/* -------------------------------------------------------
    Token ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const TokenController = require("../controllers/token");
/* ------------------------------------------------------- */
// URL: /tokens
router.route("/").get(TokenController.list).post(TokenController.create);
router
  .route("/:id")
  .get(TokenController.read)
  .put(TokenController.update)
  .patch(TokenController.update)
  .delete(TokenController.delete);
/* ------------------------------------------------------- */
module.exports = router;
