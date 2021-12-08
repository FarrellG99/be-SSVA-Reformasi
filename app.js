const express = require('express');
const app = express();
const port = 3000;
const admin = require("firebase-admin");
const axios = require('axios');

var serviceAccount = require("./ssva-reformasi-d5606-firebase-adminsdk-exr16-b93b4cb3ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssva-reformasi-d5606-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.use(express.json());

const database = admin.database();

app.get('/', (req,res) => {
    res.send('index');
});

app.post('/save', (req,res) => {
    database.ref('')
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

//Test