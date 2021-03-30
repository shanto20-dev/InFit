const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutfitSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
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
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Outfit = mongoose.model("Outfit", OutfitSchema)