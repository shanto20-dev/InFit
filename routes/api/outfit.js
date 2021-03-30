const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Outfit = require('../../models/Outfit');
const validateOutfitInput = require('../../validation/outfit');

router.get('/', (req, res) => {
    Outfit.find()
    .sort({ date: -1 })
    .then((outfits) => res.json(outfits))
    .catch((err) => res.status(400).json(err))
});

router.get('/user/:user_id', (req, res) => {
    Outfit.find({ user: req.params.user_id })
    .then((outfits) => res.json(outfits))
    .catch((err) => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
    Outfit.findById(req.params.id)
    .then((outfit) => res.json(outfit))
    .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
    const outfit = Outfit.findById(req.params.id)
    if (outfit.user === req.user.id) outfit.delete(); 
});

router.post('/new', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateOutfitInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newOutfit = new Outfit({
        user: req.user.id,
        name: req.body.name,
        tags: req.body.tags,
        description: req.body.description,
        img_url: req.body.img_url,
    })

    newOutfit.save().then((outfit) => res.json(outfit))
});