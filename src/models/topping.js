"use strict";
/* -------------------------------------------------------
    TOPPING MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Topping Schema
const ToppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "toppings", timestamps: true }
);

// Topping Model
module.exports = mongoose.model("Topping", ToppingSchema);
