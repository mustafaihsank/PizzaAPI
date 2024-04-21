"use strict";
/* -------------------------------------------------------
    TOPPING CONTROLLER
------------------------------------------------------- */
const ToppingModel = require("../models/topping");
/* ------------------------------------------------------- */
module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Toppings"]
        #swagger.summary = "List Toppings"
        #swagger.description = `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(ToppingModel);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(ToppingModel),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
        #swagger.tags = ["Toppings"]
        #swagger.summary = "Create Topping"
    */

    const data = await ToppingModel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ["Toppings"]
        #swagger.summary = "Get Single Topping"
    */
    const data = await ToppingModel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
         #swagger.tags = ["Toppings"]
        #swagger.summary = "Update Topping"
    */

    const data = await ToppingModel.updateOne(
      { _id: req.params.id },
      { ...req.body },
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
      new: await ToppingModel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Toppings"]
        #swagger.summary = "Delete Topping"
    */

    const data = await ToppingModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
