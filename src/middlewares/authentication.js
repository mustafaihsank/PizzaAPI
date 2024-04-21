"use strict";
/* -------------------------------------------------------
    AUTH MIDDLEWARE
------------------------------------------------------- */
const TokenModel = require("../models/token");
const jwt = require("jsonwebtoken");
/* ------------------------------------------------------- */

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // Simple Token == Token
      const tokenData = await TokenModel.findOne({
        token: tokenKey[1],
      }).populate("userId");

      req.user = tokenData ? tokenData.userId : undefined;
    } else if (tokenKey[0] == "Bearer") {
      // JWT == Bearer

      //jwt.verify(access_data, access_key, callbackFunction)
      jwt.verify(
        tokenKey[1],
        process.env.ACCESS_KEY,
        function (error, accessData) {
          req.user = accessData || undefined;
        }
      );
    }
  }
  next();
};
