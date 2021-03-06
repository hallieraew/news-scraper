var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headline: {
        type: String,
        unique: true,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },

}, {
    timestamps: true
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;