const fetch = import('node-fetch');
const express = require('express');
const router = express.Router();
const { getDb } = require('../config/db');

router.get('/', async (req, res) => {
  const db = getDb();
  if (!db) {
    return res.status(500).send('Database not connected.');
  }

  const pets = await db.collection('petsCollection').find().toArray();
  res.render('index', { pets });
});

module.exports = router; 
