const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const Post = require('../models/Posts'); // Example Mongoose model
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

router.get('/upload', (req, res) => {
res.render('posts');
});


router.post("/posts", upload.single('image'), async (req, res) => {
  const db = getDb();
  const { petsName, petsAge } = req.body;

  //when file is uploaded, cloudinary url
  if (req.file && req.file.path) {
    return res.status(400).json({ message: "Image is required" });
  }

  const newPet = {
    petsName,
    petsAge,
    petsImage: req.file.path, // Cloudinary URL
    likeCount: 0
  };


  try {
    const result = await db.collection("petsCollection").insertOne(newPet);
    res.status(201).json({ message: "Pet added", result });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;