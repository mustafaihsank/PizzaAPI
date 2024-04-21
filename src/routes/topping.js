"use strict";
/* -------------------------------------------------------
    TOPPING ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const ToppingController = require("../controllers/topping");
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /toppings
router.use(isAdmin);
router.route("/").get(ToppingController.list).post(ToppingController.create);
router
  .route("/:id")
  .get(ToppingController.read)
  .put(ToppingController.update)
  .patch(ToppingController.update)
  .delete(ToppingController.delete);
/* ------------------------------------------------------- */
module.exports = router;
