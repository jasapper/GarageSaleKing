import React, { Component } from "react";

const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

nightmare
.goto('http://advapps.trb.com/osgaragesales/?q=&section=events%3Agarage&radius=50&addr=32801')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});