const express = require('express');
const route = require('./routes/routes.js');
const app = express();
const cors = require("cors");

app.use(cors());

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vikas_yadav:vikasyadav@cluster0.r7ukdxt.mongodb.net/bookCollection", { useNewUrlParser: true })
  .then(() => console.log('mongodb running on '))
  .catch(err => console.log(err))

app.use('/books', route);

app.listen(3001)

