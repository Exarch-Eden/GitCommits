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

app.get("/commit", async (req, res) => {
  // mandatory query parameters
  const ownerName = req.query.owner;
  const repoName = req.query.repo;

  // for testing purposes (remove later)
  // const ownerName = "Exarch-Eden";
  // const repoName = "GitCommits";

  // optional query parameters
  const branch = req.query.branch;
  const hash = req.query.hash;

  // for testing purposes
  console.log("\n", { branch, hash }, "\n");

  // github API url
  const targetFetchUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits`;

  let data = {};

  try {
    const fetchedRes = await fetch(targetFetchUrl);
    data = await fetchedRes.json();
    console.log("\n", data, "\n");
  } catch (error) {
    console.log(
      "--------------ERROR--------------",
      error,
      "---------------------------------"
    );
    res.status(500).send();
    return;
  }

  res.status(200).send(JSON.stringify(data));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
