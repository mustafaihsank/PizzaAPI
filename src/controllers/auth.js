"use strict";
/* -------------------------------------------------------
    AUTH CONTROLLER
------------------------------------------------------- */
const UserModel = require("../models/user");
const TokenModel = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");
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

          // JWT
          const accessData = {
            key: process.env.ACCESS_KEY,
            time: process.env.ACCESS_EXP,
            data: {
              _id: user.id,
              id: user.id,
              username: user.username,
              email: user.email,
              password: user.password,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
            },
          };
          const refreshData = {
            key: process.env.REFRESH_KEY,
            time: process.env.REFRESH_EXP,
            data: {
              id: user.id,
              password: user.password, // encrypted password
            },
          };

          // jwt.sign(data, secret_key, {'expiresIn': '30m'})
          const accessToken = jwt.sign(accessData.data, accessData.key, {
            expiresIn: accessData.time,
          });
          const refreshToken = jwt.sign(refreshData.data, refreshData.key, {
            expiresIn: refreshData.time,
          });
          // JWT

          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: { access: accessToken, refresh: refreshToken },
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
  refresh: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
              bearer: {
                "refresh": "asdwqe5h6r8asf34sdf5345sdfsdfwerfw4353",
              }
            }
        }
    */
    const refreshToken = req.body.bearer.refresh;

    if (refreshToken) {
      const refreshData = await jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY
      );

      if (refreshData) {
        const user = await UserModel.findOne({ _id: refreshData.id });

        if (user && user.password === refreshData.password) {
          res.status(200).send({
            error: false,
            bearer: {
              access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
                expiresIn: process.env.ACCESS_EXP,
              }),
            },
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("Wrong id or password.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT Refresh data is wrong.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("");
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

    if (tokenKey[0] == "Token") {
      res.send({
        error: false,
        message: "Token deleted. Logout was OK.",
        result,
      });
    } else {
      res.send({
        error: false,
        message: "JWT: No need any process for logout.",
      });
    }
  },
};
