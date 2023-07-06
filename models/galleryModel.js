const moongoose = require("mongoose");

const gallerySchema = new moongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    imgType: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    alt: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = moongoose.model("Gallery", gallerySchema);
