const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // Allow all origins

app.get("/wiki", async (req, res) => {
  fetch("https://candystore.com/listofcandies.json")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log("error occured", err);
    });
  const topic = req.query.topic;
  const url = `https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${topic}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const topicRegex = `${topic}`;
    const count = [...data.matchAll(topicRegex)];
    data.parse.count = count;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5500, () => {
  console.log("Proxy running on port 5500");
});
