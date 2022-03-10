// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });



app.get("/api/data1", (req, res) => {
  res.json([
    { ID: 1, content:"test 1", Data_Time:"3/10/2022 18:21:00"},
    { ID: 2, content:"test 2", Data_Time:"3/10/2022 18:21:10"},
    { ID: 3, content:"test 3", Data_Time:"3/10/2022 18:21:20"},
    { ID: 4, content:"test 4", Data_Time:"3/10/2022 18:21:30"},
    { ID: 5, content:"test 5", Data_Time:"3/10/2022 18:21:40"},
    { ID: 6, content:"test 6", Data_Time:"3/10/2022 18:21:50"}

]);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
