"use strict";
/* -------------------------------------------------------
    PIZZA ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const PizzaController = require("../controllers/pizza");
const { isAdmin } = require("../middlewares/permissions");
const upload = require("../middlewares/upload");
/* ------------------------------------------------------- */
// URL: /pizzas
router
  .route("/")
  .get(PizzaController.list)
  // .post(isAdmin, PizzaController.create);
  .post(isAdmin, upload.array("fileName"), PizzaController.create); // upload.single("fileName") - upload.array("fileName") - upload.any()
router
  .route("/:id")
  .get(PizzaController.read)
  .put(isAdmin, upload.array("fileName"), PizzaController.update)
  .patch(isAdmin, upload.array("fileName"), PizzaController.update)
  .delete(isAdmin, PizzaController.delete);
/* ------------------------------------------------------- */
module.exports = router;
