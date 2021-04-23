const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Outfit = require("../../models/Outfit");
const Clothing = require("../../models/Clothing");
const User = require("../../models/User");
const Like = require("../../models/Like");

router.post("/", (req, res) => {
    if (req.body.liked) {
        User.findById(req.body.user).then((user) => {
            let oldLikeIdx;
            let oldLikeId = user.likes.find((like, idx) => {
                oldLikeIdx = idx;
                return like.likeable_id == req.body.itemId;
            })._id;
            user.likes.splice(oldLikeIdx, 1);
            Like.findById(oldLikeId).then((like) => like.delete());
            user.save();
        });
        if (req.body.type === "clothing") {
            Clothing.findById(req.body.itemId).then((clothing) => {
                let oldLikeIdx;
                clothing.likes.find((like, idx) => {
                    oldLikeIdx = idx;
                    return like.likeable_id == req.body.itemId;
                })._id;
                clothing.likes.splice(oldLikeIdx, 1);
                clothing.save();
            });
        } else if (req.body.type === "outfits") {
            Outfit.findById(req.body.itemId).then((outfit) => {
                let oldLikeIdx;
                outfit.likes.find((like, idx) => {
                    oldLikeIdx = idx;
                    return like.likeable_id == req.body.itemId;
                })._id;
                outfit.likes.splice(oldLikeIdx, 1);
                outfit.save();
            });
        }
        return;
    }

    const newLike = new Like({
        likeable_id: req.body.itemId,
        onModel: req.body.type,
        liker: req.body.user,
    });

    newLike.save().then((like) => {
        User.findById(req.body.user).then((user) => {
            user.likes.push(like);
            user.save();
        });
        if (req.body.type === "clothing") {
            Clothing.findById(req.body.itemId).then((clothing) => {
                clothing.likes.push(like);
                clothing.save();
            });
        } else if (req.body.type === "outfits") {
            Outfit.findById(req.body.itemId).then((outfit) => {
                outfit.likes.push(like);
                outfit.save();
            });
        }
    });
});

router.get("/:id", (req, res) => {
    let response = [];

    // User.findById(req.params.id)
    //     .then((user) => {
    //         user.likes.forEach((like) => {
    //             if (like.onModel === "clothing") {
    //                 response.push(Clothing.findById(like.likeable_id));
    //             } else if (like.onModel === "outfits") {
    //                 response.push(Outfit.findById(like.likeable_id));
    //             }
    //         });
    //     })
    //     .then(() => Promise.all(response))
    //     .then((result) => res.json(result));
    Like.find({ liker: req.params.id })
        .then((likes) => {
            likes.forEach((like) => {
                if (like.onModel === "clothing") {
                    response.push(Clothing.findById(like.likeable_id));
                } else if (like.onModel === "outfits") {
                    response.push(Outfit.findById(like.likeable_id));
                }
            });
        })
        .then(() => Promise.all(response))
        .then((result) => res.json(result));
});

module.exports = router;
