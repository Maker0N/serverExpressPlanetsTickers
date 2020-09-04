const express = require("express");
const bodyParser = require("body-parser");

const productsRouter = express.Router();

productsRouter.use(bodyParser.json());

let products = []
// = ["apple", "pina", "juice", "platan", "mellon"];

productsRouter.get("/", (req, res) => {
  if (products) {
    res.header("Content-Type", "application/json");
    res.write(JSON.stringify(products, 1, 2));
    res.end();
  }else{
    res.status(404).send('Products not found')
  }
});

productsRouter.get("/:id", (req, res) => {
  res.send(products[req.params.id]);
});

productsRouter.post("/", (req, res, next) => {
  const product = {
    title: req.body.title,
    author: req.body.author
  }
  products = [...products, product];
  res.json(products)
});

module.exports = productsRouter
