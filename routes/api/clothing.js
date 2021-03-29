const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Clothing = require("../../models/Clothing");
const validateClothingInput = require("../../validation/clothing");

router.get("/", (req, res) => {
  Clothing.find()
    .sort({ date: -1 })
    .then((clothings) => res.json(clothings))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
  Clothing.find({ user: req.params.user_id })
    .then((clothings) => res.json(clothings))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Clothing.findById(req.params.id)
    .then((clothing) => res.json(clothing))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const clothing = Clothing.findById(req.params.id);
  if (clothing.user === req.user.id) clothing.delete();
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClothingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newClothing = new Clothing({
      user: req.user.id,
      name: req.body.name,
      category: req.body.category,
      tags: req.body.tags,
      description: req.body.description,
      img_url: req.body.img_url,
    });

    newClothing.save().then((clothing) => res.json(clothing));
  }
);

module.exports = router;
