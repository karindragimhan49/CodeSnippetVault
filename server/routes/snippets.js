const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// GET all snippets
router.get('/', async (req, res) => {
    try {
        const snippets = await Snippet.find().sort({ createdAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new snippet
router.post('/', async (req, res) => {
    const snippet = new Snippet({
        title: req.body.title,
        language: req.body.language,
        code: req.body.code
    });
    try {
        const newSnippet = await snippet.save();
        res.status(201).json(newSnippet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a snippet
router.delete('/:id', async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) return res.status(404).json({ message: 'Cannot find snippet' });

        await snippet.deleteOne();
        res.json({ message: 'Deleted Snippet' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;