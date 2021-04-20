const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
    },
    description: {
        type: String,
    },
    img_url: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Clothing = mongoose.model("clothing", ClothingSchema);
