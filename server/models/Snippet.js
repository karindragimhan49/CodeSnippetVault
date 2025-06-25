const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    code: { type: String, required: true },
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

module.exports = mongoose.model('Snippet', SnippetSchema);