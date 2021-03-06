const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const puppeteer = require("puppeteer");

// parse incoming traditional HTML form submits
app.use(express.urlencoded({ extended: false }));

// parse incoming JSON payloads
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/animals/meowsalot", cors(), (req, res) => {
  // tell browser that if it loaded this url in the last 10 seconds to use that if quickly switching between pages
  res.header("Cache-Control", "max-age=10");
  res.json({ name: "Meowsalot", species: "cat", photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg", bio: "This cat is great and very vocal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque." });
});

app.get("/api/animals/barksalot", cors(), (req, res) => {
  res.header("Cache-Control", "max-age=10");
  res.json({ name: "Barksalot", species: "dog", photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg", bio: "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit." });
});

app.get("/api/animals/purrsloud", cors(), (req, res) => {
  res.header("Cache-Control", "max-age=10");
  res.json({ name: "Purrsloud", species: "cat", photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg", bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/secret", async (req, res) => {
  if (req.body.password == "qwerty") {
    let url = req.body.username;

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url);

    page.setViewport({ width: 1920, height: 1080 });
    await page.screenshot({
      path: `./public/screenshot.png`,
      fullPage: true
    });
    // await page.screenshot({ path: `screenshot${Date.now()}.png` });
    await res.json({ message: url, status: "success", screenshot: "./screenshot.png" });

    await browser.close();

    // res.json({ message: url, status: "success" });

    // res.json({ message: "screenshot.png", status: "success" });
  } else {
    res.json({ message: "You are not authorized to access this data.", status: "failure" });
  }
});

app.listen(process.env.PORT || 3000);
