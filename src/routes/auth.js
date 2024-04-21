"use strict";
/* -------------------------------------------------------
    AUTH ROUTER
------------------------------------------------------- */
const router = require("express").Router();
const AuthController = require("../controllers/auth");
/* ------------------------------------------------------- */
// URL: /auth
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);
/* ------------------------------------------------------- */
module.exports = router;
