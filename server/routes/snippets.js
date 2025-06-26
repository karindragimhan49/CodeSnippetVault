const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// --- 1. GET ALL SNIPPETS (with Search and Project Filtering) ---
// මේක තමයි එකම GET '/' endpoint එක. Search, filter ඔක්කොම මේකෙන් handle කරනවා.
router.get('/', async (req, res) => {
    try {
        const { project, search } = req.query; // Frontend එකෙන් එවන query parameters ගන්නවා

        let query = {}; // MongoDB query එක හදන්න හිස් object එකක්

        // Project එකක් select කරලා එවලා නම්, සහ ඒක 'All Projects' නෙමෙයි නම්, query එකට එකතු කරනවා
        if (project && project !== 'All Projects') {
            query.project = project;
        }

        // Search term එකක් එවලා නම්, title එකෙන් case-insensitive විදිහට search කරන්න query එකට එකතු කරනවා
        if (search) {
            query.title = { $regex: search, $options: 'i' }; 
        }

        const snippets = await Snippet.find(query).sort({ createdAt: -1 }); // හදපු query එකෙන් data හොයනවා
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// --- 2. GET ALL UNIQUE PROJECT NAMES ---
// Frontend එකේ dropdown එකට projects list එක ගන්න හදපු අලුත් endpoint එක
router.get('/projects', async (req, res) => {
    try {
        // Database එකේ තියෙන unique 'project' field values විතරක් ගන්නවා
        const projects = await Snippet.distinct('project');
        // ඒ list එකට, 'All Projects' කියන එකත් මුලින්ම එකතු කරලා frontend එකට යවනවා
        res.json(['All Projects', ...projects]);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// --- 3. POST A NEW SNIPPET ---
// අලුත් snippet එකක් database එකේ save කරන endpoint එක
router.post('/', async (req, res) => {
    // Frontend එකෙන් එවන data ටික destructure කරගන්නවා
    let { title, language, code, project } = req.body;

    // Validation: අවශ්‍ය fields තියෙනවද බලනවා
    if (!title || !language || !code) {
        return res.status(400).json({ message: 'Title, language, and code are required.' });
    }
    
    // Project එකක් එවලා නැත්නම් හෝ හිස් නම්, default 'General' value එක දානවා
    if (!project || project.trim() === '') {
        project = 'General';
    }

    // අලුත් Snippet object එකක් හදනවා
    const newSnippet = new Snippet({ 
        title, 
        language, 
        code, 
        project 
    });

    try {
        // Database එකේ save කරනවා
        const savedSnippet = await newSnippet.save();
        // සාර්ථකව save වුණා නම්, අලුතෙන් හදපු snippet එක frontend එකට යවනවා
        res.status(201).json(savedSnippet);
    } catch (err) {
        res.status(400).json({ message: "Error saving snippet: " + err.message });
    }
});

// --- 4. DELETE A SNIPPET ---
// Snippet එකක් ID එකෙන් හොයලා delete කරන endpoint එක
router.delete('/:id', async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }

        await snippet.deleteOne();
        res.json({ message: 'Snippet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

module.exports = router;