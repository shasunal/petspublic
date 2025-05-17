const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

// Route: POST a new pet
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const db = getDb();
    const { petsName, petsCaption, petsType, petsAge } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newPet = {
      petsName,
      petsCaption,
      petsType,
      petsAge,
      petsImage: req.file.path,
      likeCount: 0
    };

    await db.collection("petsCollection").insertOne(newPet);
    res.redirect('/?cameFromPost=true');
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route: Like a pet (increment likeCount)
router.post('/like/:id', async (req, res) => {
  const db = getDb();
  const petId = req.params.id;

  try {
    await db.collection('petsCollection').updateOne(
      { _id: new ObjectId(petId) },
      { $inc: { likeCount: 1 } }
    );
    res.redirect('/');
  } catch (err) {
    console.error("❌ Like failed:", err);
    res.status(500).send("Failed to like pet");
  }
});

module.exports = router;
