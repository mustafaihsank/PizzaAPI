"use strict";
/* -------------------------------------------------------
    AUTH MIDDLEWARE
------------------------------------------------------- */
const TokenModel = require("../models/token");
/* ------------------------------------------------------- */

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      const tokenData = await TokenModel.findOne({
        token: tokenKey[1],
      }).populate("userId");

      req.user = tokenData ? tokenData.userId : undefined;
    }
  }
  next();
};
