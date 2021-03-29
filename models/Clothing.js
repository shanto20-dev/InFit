const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    description: {
        type: String
    },
    img_url: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Clothing = mongoose.model('clothing', ClothingSchema);
module.exports = Clothing;