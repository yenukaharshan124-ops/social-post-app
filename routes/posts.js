const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Create Post
router.post('/', verifyToken, upload.array('images', 5), async (req, res) => {
  const { caption } = req.body;
  try {
    const images = await Promise.all(
      req.files.map(file => cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) throw error;
        return result.secure_url;
      }).end(file.buffer))
    );
    const post = new Post({ caption, images, publisher: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().populate('publisher', 'firstName lastName').sort({ publishedDate: -1 });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.publisher.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like Post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.publisher.toString() === req.userId) return res.status(400).json({ error: 'Cannot like own post' });
    if (post.likes.includes(req.userId)) return res.status(400).json({ error: 'Already liked' });
    post.likes.push(req.userId);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;