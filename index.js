const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_BUILD_PATH = __dirname + "/client/build";

app.use(express.static(CLIENT_BUILD_PATH));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.get("/commits", async (req, res) => {
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
  let targetFetchUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits`;

  if (branch) {
    targetFetchUrl += `?sha=${branch}`
  }

  let data = {};

  try {
    const fetchedRes = await fetch(targetFetchUrl);
    data = await fetchedRes.json();
    // console.log("\n", data, "\n");
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

/**
 * Retrieves the GitHub repository's branch list.
 */
app.get("/branches", async (req, res) =>  {
  // mandatory query parameters
  const ownerName = req.query.owner;
  const repoName = req.query.repo;

  let data = {};
  
  // github API url to extract the branch list
  const branchListUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
  // github API url to extract the default branch
  const defaultBranchUrl = `https://api.github.com/repos/${ownerName}/${repoName}`;

  try {
    const fetchedBranchList = await fetch(branchListUrl);
    data.branchList = await fetchedBranchList.json();

    const fetchedRepoData = await fetch(defaultBranchUrl)
    const repoDataJson = await fetchedRepoData.json();
    data.defaultBranch = repoDataJson.default_branch;
  } catch (error) {
    console.log(
      "--------------ERROR--------------",
      error,
      "---------------------------------"
    );
    res.status(500).send(error);
    return;
  }

  res.status(200).send(JSON.stringify(data));
});

app.get("/single", async (req, res) => {
  // mandatory query parameters
  const ownerName = req.query.owner;
  const repoName = req.query.repo;
  const sha = req.query.sha;

  let data = {};
  
  // github API url to extract the individual commit data from
  const commitUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits/${sha}`;

  try {
    const fetchedBranchList = await fetch(commitUrl);
    data = await fetchedBranchList.json();
  } catch (error) {
    console.log(
      "--------------ERROR--------------",
      error,
      "---------------------------------"
    );
    res.status(500).send(error);
    return;
  }

  res.status(200).send(JSON.stringify(data));
});

app.get("*", (req, res) => {
  const indexFile = CLIENT_BUILD_PATH + "/index.html";
  const indexDoesNotExistMessage = "Index file does not exist.";

  // index file exists
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
    res.status = 200;
    res.end();
    return;
  }

  // index file does not exist
  console.log(indexDoesNotExistMessage);
  res.status(404).send(indexDoesNotExistMessage);
});


app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
