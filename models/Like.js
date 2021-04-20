const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    likeable_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "onModel",
    },

    onModel: {
        type: String,
        required: true,
        enum: ["clothing", "outfits"],
    },

    liker: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});

module.exports = Like = mongoose.model("likes", LikeSchema);
