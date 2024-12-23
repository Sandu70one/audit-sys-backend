const express = require("express");
const { db } = require('../firebase');
const { collection, addDoc, getDocs } = require("firebase/firestore");
const router = express.Router();

// Create a new document in the 'users' collection
router.post("/create-user", async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      createdAt: new Date().toISOString()
    };

    const response = await addDoc(collection(db, 'users'), data);
    res.status(200).send('Document created successfully');
  } catch (error) {
    console.error("Error creating document: ", error);
    res.status(500).send('Error creating document: ' + error);
  }
});

// Get all documents from the 'users' collection
router.get("/get-data", async (req, res) => {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).send('Error getting documents: ' + error.message);
  }
});

module.exports = router;

