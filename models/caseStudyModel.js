const moongoose = require("mongoose");

const caseStudySchema = new moongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: false,
    },
    imgType: {
        type: String,
        required: true,
        unique: false,
    },
    alt: {
        type: String,
        unique: false,
    },
    title: {
        type: String,
        required: true,
        unique: false,
    },
    content: {
        type: String,
        required: true,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = moongoose.model("CaseStudy", caseStudySchema);