const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).send('Endpoint "/" received your GET request');
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
