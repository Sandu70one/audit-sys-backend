const express = require("express");
const { db } = require("../firebase");
const {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  Timestamp,
} = require("firebase/firestore");
const router = express.Router();

//import functions
const envData = require("../services/envAggregate.js");

// register user
router.post("/register-user", async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      createdAt: new Date().toISOString(),
    };

    const response = await addDoc(collection(db, "users"), data);
    res.status(200).send("Document created successfully");
  } catch (error) {
    console.error("Error creating document: ", error);
    res.status(500).send("Error creating document: " + error);
  }
});

//post sample power data
router.post("/power-data", async (req, res) => {
  try {
    const data = {
      power: req.body.power,
      voltage: req.body.voltage,
      current: req.body.current,
      createdAt: Timestamp.fromDate(new Date()),
    };

    const response = await addDoc(collection(db, "powerData"), data);
    res.status(200).send("Document created successfully");
  } catch (error) {
    console.error("Error creating document: ", error);
    res.status(500).send("Error creating document: " + error);
  }
});

//post sample environmental data
router.post("/environmental-data", async (req, res) => {
  try {
    const data = {
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      lightIntensity: req.body.lightIntensity,
      createdAt: new Date().toISOString(),
    };

    const response = await addDoc(collection(db, "environmentalData"), data);
    res.status(200).send("Document created successfully");
  } catch (error) {
    console.error("Error creating document: ", error);
    res.status(500).send("Error creating document: " + error);
  }
});

// login user
router.get("/login-user", async (req, res) => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const user = users.find(
      (user) =>
        user.email === req.body.email && user.password === req.body.password
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).send("Error getting documents: " + error.message);
  }
});

// Get all documents from the 'users' collection
router.get("/get-data", async (req, res) => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).send("Error getting documents: " + error.message);
  }
});

// fetch data once a week and pass it to the aggregate function
setInterval(async () => {
  try {
    data = await envData();
    // console.log(data);
  } catch (error) {}
}, 2000);

module.exports = router;
