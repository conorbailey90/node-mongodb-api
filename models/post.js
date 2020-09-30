const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
    image: String,
    date: {type: Date, default: Date.now}

})

module.exports = mongoose.model('Posts', postSchema);