const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

router.post("/", upload.single('image'), async (req, res) => {

  try {
    const db = getDb();
    const { petsName, petsCaption, petsType } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newPet = {
      petsName,
      petsCaption,
      petsType,
      petsImage: req.file.path,
      likeCount: 0
    };

    await db.collection("petsCollection").insertOne(newPet);//finds all images and saves as array

    // Redirect to the gallery after submission
    res.redirect('/gallery');
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;