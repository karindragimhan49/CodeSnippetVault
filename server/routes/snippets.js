const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');


// GET all snippets (with search and project filtering)
router.get('/', async (req, res) => {
    try {
        const { project, search } = req.query; // <-- query parameters ගන්නවා

        let query = {}; // MongoDB query object එක

        if (project && project !== 'All Projects') {
            query.project = project;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }; // 'i' for case-insensitive
        }

        const snippets = await Snippet.find(query).sort({ createdAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// --- අලුත් Endpoint එක: Projects list එක ගන්න ---
// GET all unique project names
router.get('/projects', async (req, res) => {
    try {
        const projects = await Snippet.distinct('project');
        res.json(['All Projects', ...projects]); // 'All Projects' කියන එකත් එකතු කරනවා
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// GET all snippets, sorted by newest first
router.get('/', async (req, res) => {
    try {
        const snippets = await Snippet.find().sort({ createdAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// POST a new snippet
router.post('/', async (req, res) => {
    const { title, language, code } = req.body;
    if (!title || !language || !code) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const newSnippet = new Snippet({ title, language, code });
    try {
        const savedSnippet = await newSnippet.save();
        res.status(201).json(savedSnippet);
    } catch (err) {
        res.status(400).json({ message: "Error saving snippet: " + err.message });
    }
});

// DELETE a snippet
router.delete('/:id', async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

        await snippet.deleteOne();
        res.json({ message: 'Snippet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

module.exports = router;