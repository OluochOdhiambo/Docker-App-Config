let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/joker", function (req, res) {
  let img = fs.readFileSync("images/joker.jpg");
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

app.get("/get-profile", function (req, res) {
  let response = res;

  MongoClient.connect(
    "mongodb://admin:pass@localhost:27017",
    function (err, client) {
      if (err) throw err;

      let db = client.db("user-accounts");
      let query = { userid: 1 };
      db.collection("users").findOne(query, function (err, result) {
        if (err) throw err;
        client.close();
        response.send(result);
      });
    }
  );
});

app.post("/update-profile", function (req, res) {
  let userObj = req.body;
  let response = res;

  console.log("connecting to the database...");

  MongoClient.connect(
    "mongodb://admin:pass@localhost:27017",
    function (err, client) {
      if (err) throw err;

      let db = client.db("user-accounts");
      userObj["userid"] = 1;
      let query = { userid: 1 };
      let newValues = { $set: userObj };

      console.log("successfully connected to the user-accounts db");

      db.collection("users").updateOne(
        query,
        newValues,
        { upsert: true },
        function (err, res) {
          if (err) throw err;
          console.log("successfully updated or inserted");
          client.close();
          response.send(userObj);
        }
      );
    }
  );
});

app.listen(8000, function () {
  console.log("app listening on port 8000!");
});
