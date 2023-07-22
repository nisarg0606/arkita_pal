const moongoose = require("mongoose");

const categorySchema = new moongoose.Schema({
    name: {
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

module.exports = moongoose.model("Category", categorySchema);