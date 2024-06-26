"use strict";
/* -------------------------------------------------------
    PIZZA CONTROLLER
------------------------------------------------------- */
const PizzaModel = require("../models/pizza");
/* ------------------------------------------------------- */
module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Pizzas"]
        #swagger.summary = "List Pizzas"
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

    const data = await res.getModelList(PizzaModel, {}, "toppingIds");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(PizzaModel),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
        #swagger.tags = ["Pizzas"]
        #swagger.summary = "Create Pizza"
    */

    const data = await PizzaModel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ["Pizzas"]
        #swagger.summary = "Get Single Pizza"
    */
    const data = await PizzaModel.findOne({ _id: req.params.id }).populate(
      "toppingIds"
    );

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
         #swagger.tags = ["Pizzas"]
        #swagger.summary = "Update Pizza"
    */

    // console.log(req.file); // multer -> upload.single() kullandiysan
    // console.log(req.files); // multer -> upload.array() kullandiysan

    // Get previous pizza images
    const prevPizzaImages = await PizzaModel.findOne(
      { _id: req.params.id },
      { images: true }
    );

    req.files.forEach((file) =>
      prevPizzaImages.images.push("/uploads/" + file.filename)
    );

    const data = await PizzaModel.updateOne(
      { _id: req.params.id },
      { ...req.body, images: [...pizza.images] },
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
      new: await PizzaModel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Pizzas"]
        #swagger.summary = "Delete Pizza"
    */

    const data = await PizzaModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
