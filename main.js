const express = require("express");
const app = express();
const port = 3000;
const topic = "Singapore";

// const submitButton = document.querySelector("button");
// const input = document.querySelector("input");
// const countText = document.querySelector("#js-count-occurence");

// submitButton.addEventListener("click", getDataFromWiki);
// input.addEventListener("keydown", (e) => {
//   if (e.keyCode === 13) getDataFromWiki();
// });

// function getDataFromWiki() {
//   const topic = input.value;
//   let count = 0;

//   const URL = `http://localhost:5500/wiki?topic=${topic}`;
//   fetch(URL)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const topicRegex = `${topic}`;
//       count = [...data.matchAll(topicRegex)].length;
//       countText.textContent = `Number of times ${topic} appeared = ${count}`;
//     })
//     .catch((error) => {
//       console.log(`Error fetching: ${error}`);
//     });
// }

app.get("/", (req, res) => {
  res.send("Hello World!");
});

fetch(
  `https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${topic}`
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    console.log("error occured", err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
