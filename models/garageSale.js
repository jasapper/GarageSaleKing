const mongoose = require("mongoose");

const garageSaleSchema = new mongoose.Schema({
  location: String, // Stored as coordinates longitude, latitude order
  coordinates: {
    type: [Number],
    index: "2dsphere"
  },
  createdAt: { type: Date, Default: Date.now },
  startDate: String,
  endDate: String,
  description: String,
  images: [{ type: String }],
  creator: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

mongoose.model("GarageSale", garageSaleSchema);
