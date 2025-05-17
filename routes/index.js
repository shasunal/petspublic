const express = require('express');
const router = express.Router();
const { getDb } = require('../config/db');

router.get('/', async (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).send('Database not connected.');

  try {
    const { type, name, caption } = req.query;
    const query = {};

    if (type) query.petsType = type;
    if (name) query.petsName = { $regex: new RegExp(name, 'i') };
    if (caption) query.petsCaption = { $regex: new RegExp(caption, 'i') };

    const petsCollection = await db.collection('petsCollection')
    .find(query) 
    .sort({ _id: -1 })
    .toArray();
  


    res.render('index', {
      petsCollection,
      selectedType: type || '',
      searchName: name || '',
      searchCaption: caption || ''
    });

  } catch (err) {
    console.error("Gallery fetch error", err);
    res.status(500).send("Failed to load gallery");
  }




  
});

module.exports = router;
