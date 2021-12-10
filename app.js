import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set} from "firebase/database";

import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
var con   = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbssva"
});
con.connect(function (err){
    if(err) throw err;
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

app.post('/insertSensor', function(req,res) {
  var id = req.body.id;
  var bagian = req.body.bagian;
  var nama = req.body.nama;
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;
  var created = new Date()
  
  con.query(`insert into datalog values ('${id}', '${bagian}', '${nama}', '${a}', '${b}', '${c}','${created}','')`, function(err, rows) {
      if(err) res.status(401).send(err);
      else{
          var hasil = []; 
          hasil[0] = { ID: id, Bagian: bagian , Status: "Berhasil Insert"};
          res.status(200).json(hasil); 

          const db = getDatabase();
          set(ref(db, 'sensors/' + id), {
            bagian: bagian,
            nama: nama,
            a: a,
            b: b,
            c: c,
          });
      }
  }); 
  
});

const firebaseConfig = {
    apiKey: "AIzaSyAOZ1HkQTMXKWkLnUQBXyp9oGFR93Tavvc",
    authDomain: "ssva-reformasi-d5606.firebaseapp.com",
    databaseURL: "https://ssva-reformasi-d5606-default-rtdb.asia-southeast1.firebasedatabase.app/",
    //storageBucket: "bucket.appspot.com"
};

initializeApp(firebaseConfig);

// Get a reference to the database service
const dbRef = ref(getDatabase());
get(child(dbRef, `sensors`))
  .then((snapshot) => {
    //var key = child.key;
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.exportVal);
    });
    // get(child(dbRef, `${key}`)).then((snapshot) => {
    //   console.log("asda : " + snapshot.key);
    //   if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    // });
    // if (snapshot.exists()) {
    //   console.log(snapshot.val());
    // } else {
    //   console.log("No data available");
    // }
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req,res) => {
    res.send('index');
});

app.get('/getSelect', function(req,res) {
  con.query(`select * from datalog`, function(err,rows) {
      if (rows.length > 0) {
          res.status(200).send(rows);
      }
  });
});