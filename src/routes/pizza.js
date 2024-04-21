"use strict";
/* -------------------------------------------------------
    PIZZA ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const PizzaController = require("../controllers/pizza");
/* ------------------------------------------------------- */
// URL: /pizzas
router.route("/").get(PizzaController.list).post(PizzaController.create);
router
  .route("/:id")
  .get(PizzaController.read)
  .put(PizzaController.update)
  .patch(PizzaController.update)
  .delete(PizzaController.delete);
/* ------------------------------------------------------- */
module.exports = router;
