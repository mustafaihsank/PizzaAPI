"use strict";
/* -------------------------------------------------------
    ORDER ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const OrderController = require("../controllers/order");
/* ------------------------------------------------------- */
// URL: /Orders
router.route("/").get(OrderController.list).post(OrderController.create);
router
  .route("/:id")
  .get(OrderController.read)
  .put(OrderController.update)
  .patch(OrderController.update)
  .delete(OrderController.delete);
/* ------------------------------------------------------- */
module.exports = router;
