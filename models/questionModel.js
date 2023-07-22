const moongoose = require("mongoose");
const category = require("./categoryModel");
const questionSchema = new moongoose.Schema({
    category: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    question: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    answer: {
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

module.exports = moongoose.model("Question", questionSchema);