const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Outfit = require("../../models/Outfit");
const Clothing = require("../../models/Clothing");

router.get("/", (req, res) => {
    let clothingArr = [];
    let outfitArr = [];
    Clothing.find()
        .then((clothing) => {
            let clothingItems = clothing.filter((cloth) =>
                cloth.name
                    .toLowerCase()
                    .includes(req.query.searchTerm.toLowerCase())
            );
            let clothingItems2 = clothing.filter((cloth) => {
                let clothes;
                cloth.tags.forEach((tag) => {
                    if (
                        tag
                            .toLowerCase()
                            .includes(req.query.searchTerm.toLowerCase())
                    )
                        clothes = cloth;
                });
                if (!clothes) return;
                if (clothes && !clothingItems.includes(clothes)) return clothes;
            });

            clothingArr = clothingItems.concat(clothingItems2);
        })
        .then(() => {
            Outfit.find()
                .then((outfit) => {
                    outfitItems = outfit.filter((outfit) =>
                        outfit.name
                            .toLowerCase()
                            .includes(req.query.searchTerm.toLowerCase())
                    );
                    outfitItems2 = outfit.filter((outfit) => {
                        let outfits;
                        outfit.tags.forEach((tag) => {
                            if (
                                tag
                                    .toLowerCase()
                                    .includes(
                                        req.query.searchTerm.toLowerCase()
                                    )
                            )
                                outfits = outfit;
                        });
                        if (!outfits) return;
                        if (outfits && !outfitItems.includes(outfits))
                            return outfits;
                    });
                    outfitArr = outfitItems.concat(outfitItems2);
                })
                .then(() => {
                    let fullRes = outfitArr.concat(clothingArr);
                    return res.json(fullRes);
                });
        });
});

module.exports = router;
