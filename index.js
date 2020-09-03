const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();

const app = express();
const URL = "https://api.livecoin.net/exchange/trades";

app.use(bodyParser.json());

let products = ["apple", "pina", "juice", "platan", "mellon"];

app.get("/", (req, res, next) => {
  res.send("Its working on 192.168.1.76:8087");
});

app.get('/ticker/:ticker', async (req, res) => {
  const { data: tickerVar } = await axios(
    "https://api.livecoin.net/exchange/ticker"
  );
  const upperTicker = `${req.params.ticker}`.toUpperCase()
  res.json(tickerVar.filter(it => it.cur === upperTicker))
})

app.get("/products", (req, res) => {
  res.send(products);
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

app.get("/products/:id", (req, res) => {
  res.send(products[req.params.id]);
});

app.post("/products", (req, res, next) => {
  const newItem = req.body;
  products = [...products, newItem.item];
  return res.send(products);
});

app.listen(8087, () => {
  console.log("Its started", new Date());
})
