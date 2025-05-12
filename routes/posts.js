require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.post('/posts', upload.single('image'), async (req, res) => {
  const imageUrl = req.file.path; //  Cloudinary URL
  const { title, body } = req.body;

  const post = {
    title,
    body,
    image: imageUrl,
  };

  // save post to mongo here
  console.log(post); 
  res.send('Image uploaded and post created!');
});
