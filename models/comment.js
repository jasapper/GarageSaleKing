const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentBody: String,
    createdAt: {type: Date, default: Date.now},
    creator: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String
    }
})

mongoose.model("Comment", commentSchema);