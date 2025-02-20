const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors()) // Allow all origins

app.get('/wiki', async (req, res) => {
  const topic = req.query.topic
  const url = `https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${topic}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    // const data = { parse: { title: 'Singapore', pageid: 27318, text: {* :'<div class="mw-content-ltr mw-parser-output" lang="en" dir="ltr"><div class="shortdescription nomobile noexcerpt noprint searchaux" style="display:none">Country in Southeast Asia</div>'} } }
    const topicRegex = `${topic}`
    const count = [...data.matchAll(topicRegex)]
    data.parse.count = count
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

app.listen(3000, () => {
  console.log('Proxy running on port 3000')
})
