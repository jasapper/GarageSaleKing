import React, { Component } from "react";

const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

nightmare
.goto('https://www.searchtempest.com/search?location=32803&maxDist=25&search_string=&keytype=adv&Region=na&cityselect=zip&page=0&category=8&subcat=gms&minAsk=min&maxAsk=max&minYear=min&maxYear=max&q=+%5Binurl%3Agms+%5D+inurl%3A%28gms%29')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});