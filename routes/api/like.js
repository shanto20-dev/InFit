const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Outfit = require("../../models/Outfit");
const Clothing = require("../../models/Clothing");
const Like = require("../../models/Like");

router.post("/", (req, res) => {
    const newLike = new Like({
        // likeable_id:
    });
});

module.exports = router;
