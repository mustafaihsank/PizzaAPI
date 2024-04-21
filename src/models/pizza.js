"use strict";
/* -------------------------------------------------------
    PIZZA MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

// Pizza Schema
const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // Many to Many - You can use many toppings for one pizza
    toppingIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping",
      },
    ],
  },
  { collection: "pizzas", timestamps: true }
);

// Pizza Model
module.exports = mongoose.model("Pizza", PizzaSchema);
