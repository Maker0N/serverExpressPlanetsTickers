const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const URL = "https://api.livecoin.net/exchange/trades";
const productsRouter = require("./products")

app.use(bodyParser.json());
app.use("/products", productsRouter);

app.get("/", (req, res, next) => {
  res.send("Its working on 192.168.1.76:8087");
});

app.get('/ticker/:ticker', async (req, res) => {
  const { data: tickerVar } = await axios(
    "https://api.livecoin.net/exchange/ticker"
  );
  const upperTicker = `${req.params.ticker}`.toUpperCase()
  res.header("Content-Type", "application/json");
  res.write(JSON.stringify(tickerVar.filter(it => it.symbol === `${upperTicker}/BTC`), 1, 2))
  res.end()
})

app.get("/planets", async (req, res) => {
  const { data: planets } = await axios("https://swapi.dev/api/planets");
  const { data: planets2 } = await axios(
    "https://swapi.dev/api/planets?page=2"
  );
  const { data: planets3 } = await axios(
    "https://swapi.dev/api/planets?page=3"
  );
  const { data: planets4 } = await axios(
    "https://swapi.dev/api/planets?page=4"
  );
  const { data: planets5 } = await axios(
    "https://swapi.dev/api/planets?page=5"
  );
  const { data: planets6 } = await axios(
    "https://swapi.dev/api/planets?page=6"
  );
  res.json({
    ...planets,
    results: [
      ...planets.results,
      planets2.results,
      planets3.results,
      planets4.results,
      planets5.results,
      planets6.results,
    ],
  });
});

app.get("/planets/:number", async (req, res) => {
  const planetNumber = req.params.number;
  const { data: planet } = await axios(
    `https://swapi.dev/api/planets/${planetNumber}/`
  );
  res.header('Content-Type', 'application/json');
  res.write(JSON.stringify(planet, 1, 2));
  res.end()
});

app.listen(8087, () => {
  console.log("Its started", new Date());
})
