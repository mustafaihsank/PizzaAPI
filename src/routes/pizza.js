"use strict";
/* -------------------------------------------------------
    PIZZA ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const PizzaController = require("../controllers/pizza");
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /pizzas
router
  .route("/")
  .get(PizzaController.list)
  .post(isAdmin, PizzaController.create);
router
  .route("/:id")
  .get(PizzaController.read)
  .put(isAdmin, PizzaController.update)
  .patch(isAdmin, PizzaController.update)
  .delete(isAdmin, PizzaController.delete);
/* ------------------------------------------------------- */
module.exports = router;
