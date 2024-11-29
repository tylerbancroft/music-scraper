const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let artistData = {
    "Said The Whale": [
        { platform: "Instagram", url: "https://www.instagram.com/saidthewhale" },
        { platform: "Tiktok", url: "https://www.tiktok.com/@saidthewhale" },
        { platform: "Twitter", url: "https://www.twitter.com/saidthewhale" },
        { platform: "Facebook", url: "https://www.facebook.com/saidthewhale" }
    ]
};

// Add new artist data
app.post('/add-artist', (req, res) => {
    const { name, urls } = req.body;
    if (!name || !urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    artistData[name] = urls.map(url => ({
        platform: determinePlatform(url),
        url
    }));

    res.json({ message: `${
