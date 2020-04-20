const express = require("express");

const app = express();

// when you get a 'get' request on the / route, run this function
app.get("/", (request, response) => {
  response.json({
    message: "Meow!!!",
  });
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
