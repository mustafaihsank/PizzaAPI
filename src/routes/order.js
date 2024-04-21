"use strict";
/* -------------------------------------------------------
    ORDER ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const OrderController = require("../controllers/order");
const permission = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /Orders
router
  .route("/")
  .get(permission.isLogin, OrderController.list)
  .post(permission.isLogin, OrderController.create);
router
  .route("/:id")
  .get(permission.isLogin, OrderController.read)
  .put(permission.isAdmin, OrderController.update)
  .patch(permission.isAdmin, OrderController.update)
  .delete(permission.isAdmin, OrderController.delete);
/* ------------------------------------------------------- */
module.exports = router;
