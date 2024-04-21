"use strict";
/* -------------------------------------------------------
    AUTH CONTROLLER
------------------------------------------------------- */
const UserModel = require("../models/user");
const TokenModel = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */

module.exports = {
  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "password": "aA?123456",
            }
        }
    */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await UserModel.findOne({ $or: [{ username }, { email }] });

      if (user && user.password === passwordEncrypt(password)) {
        if (user.isActive) {
          // Simple Token
          let tokenData = await TokenModel.findOne({ userId: user.id });
          if (!tokenData)
            // If user has no token create one
            tokenData = await TokenModel.create({
              userId: user.id,
              token: passwordEncrypt(user.id + Date.now()),
            });
          // Simple Token

          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          throw new Error("This account is not active.");
        }
      } else {
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "simpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */

    const auth = req.headers?.authorization;
    const tokenKey = auth ? auth.split(" ") : null;
    const result = await TokenModel.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
      result,
    });
  },
};
