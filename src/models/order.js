"use strict";
/* -------------------------------------------------------
    ORDER MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

// Order Schema
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: function () {
        // Default works on create
        return this.quantity * this.price;
      },
      transform: function () {
        // Transform works on update, If you get amount value from frontend it doesn't care and it calculates automatically itself
        return this.quantity * this.price;
      },
    },
  },
  { collection: "orders", timestamps: true }
);

// Order Model
module.exports = mongoose.model("Order", OrderSchema);
