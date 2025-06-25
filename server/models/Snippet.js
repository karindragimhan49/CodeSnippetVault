// server/models/Snippet.js

const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    project: { type: String, required: true, trim: true, default: 'General' }, 
}, { timestamps: true });

module.exports = mongoose.model('Snippet', SnippetSchema);