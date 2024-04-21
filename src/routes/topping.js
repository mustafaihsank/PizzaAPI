"use strict";
/* -------------------------------------------------------
    TOPPING ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const ToppingController = require("../controllers/topping");
/* ------------------------------------------------------- */
// URL: /toppings
router.route("/").get(ToppingController.list).post(ToppingController.create);
router
  .route("/:id")
  .get(ToppingController.read)
  .put(ToppingController.update)
  .patch(ToppingController.update)
  .delete(ToppingController.delete);
/* ------------------------------------------------------- */
module.exports = router;
