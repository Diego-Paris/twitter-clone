const express = require("express");
const cors = require("cors");
const monk = require("monk");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/meower");
const mews = db.get("mews");
const filter = new Filter();

app.use(cors());
app.use(express.json());


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dparis:<paris>@cluster0-d5egs.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



// when you get a 'get' request on the / route, run this function
app.get("/", (req, res) => {
  res.json({
    message: "hello world!!!",
  });
});

app.get("/mews", (req, res) => {
  mews
    .find()
    .then(mews => {
      res.json(mews);
    })
});

function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim() !== "" &&
    mew.content &&
    mew.content.toString().trim() !== ""
  );
}

app.use(rateLimit({
  windowMs: 30 * 1000,   // determines the milliseconds 
  max: 1          // limit each IP to specified number of requests per windowMs
}));

app.post("/mews", (req, res) => {
  if (isValidMew(req.body)) {
    //insert DB
    const mew = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: new Date()
    };
    console.log(mew);

    mews.insert(mew).then(createdMew => {
      res.json(createdMew);
    });
  } else {
    res.status(422);
    res.json({
      message: "Hey! Name and content are required!",
    });
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
