const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  images: [{ type: String }], // Cloudinary URLs
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedDate: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Post', postSchema);