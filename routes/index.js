const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/db'); 

router.get('/', async (req, res) => {
  const db = await connectToDatabase();
  const pets = await db.collection('petsCollection').find().toArray();

  res.render('index', { pets }); 
});

module.exports = router;
