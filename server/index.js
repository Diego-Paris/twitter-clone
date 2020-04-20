const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// when you get a 'get' request on the / route, run this function
app.get("/", (req, res) => {
  res.json({
    message: "hello world!!!",
  });
});

app.post('/mews', (req, res)=> {
  console.log(req.body);
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
