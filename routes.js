const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./expressError");

const shoppingList = [];

/** GET /items: get list of items */

router.get("/", function (req, res) {
  res.json({ items });
});

router.post("/", function (req, res) {
  const newItem = {
    name: req.body.name,
    price: req.body.price
  };
  items.push(newItem);
  res.status(201).json({
    added: newItem
  });
});

router.get("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name);
  console.log(items);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json(
    foundItem
  );
});


module.exports = router;