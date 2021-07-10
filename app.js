const express = require("express");
const shortId = require("shortid");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const path = require("path");
require("./db/conn");
const ShortUrl = require("./models/url.model");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  res.render("index");
});

app.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      throw createHttpError.BadRequest("provide a valid url");
    }
    const urlExists = await ShortUrl.findOne({ url });
    if (urlExists) {
      res.render("index", {
        short_url: "http://localhost:3000/" + urlExists.shortId,
      });
      return;
    }
    const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() });
    const result = await shortUrl.save();

    res.render("index", {
      short_url: "http://localhost:3000/" + result.shortId,
    });
  } catch (error) {
    next(error);
  }
});
app.get("/:shortId", async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const result = await ShortUrl.findOne({ shortId });
    if (!result) {
      throw createHttpError.NotFound("short url dose not exixsts");
    }
    res.redirect(result.url);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createHttpError.notFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("index", { error: err.message });
});

app.listen(port, () => {
  console.log("server is done ");
});
