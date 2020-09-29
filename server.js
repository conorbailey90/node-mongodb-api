
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

const port = process.env.port || 3000;

require('dotenv').config();
app.use(express.json());
app.use(cors());

// MongoDB

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,  useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", error => {
  console.log(error)
})
db.once("open", ()=> {
  console.log("Connected to MongoDB database.")
})


// Routes
app.use('/posts', require('./routes/posts'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});