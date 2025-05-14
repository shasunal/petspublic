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
      const { petsName, petsAge } = req.body;
  
      
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "Image is required" });
      }
  
      const newPet = {
        petsName,
        petsAge,
        petsImage: req.file.path,
        likeCount: 0
      };
  
      await db.collection("petsCollection").insertOne(newPet);
      res.status(201).json({ message: "Pet added" });
    } catch (err) {
      console.error("POST error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  

  module.exports = router;