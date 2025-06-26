const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// --- 1. GET ALL SNIPPETS (with Search and Project Filtering) ---

router.get('/', async (req, res) => {
    try {
        const { project, search } = req.query;

        let query = {}; 

      
        if (project && project !== 'All Projects') {
            query.project = project;
        }

        
        if (search) {
            query.title = { $regex: search, $options: 'i' }; 
        }

        const snippets = await Snippet.find(query).sort({ createdAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

router.get('/projects', async (req, res) => {
    try {
        
        const projects = await Snippet.distinct('project');
        
        res.json(['All Projects', ...projects]);
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// --- 3. POST A NEW SNIPPET ---

router.post('/', async (req, res) => {
 
    let { title, language, code, project } = req.body;

    // Validation
    if (!title || !language || !code) {
        return res.status(400).json({ message: 'Title, language, and code are required.' });
    }
    
    
    if (!project || project.trim() === '') {
        project = 'General';
    }

 
    const newSnippet = new Snippet({ 
        title, 
        language, 
        code, 
        project 
    });

    try {
       
        const savedSnippet = await newSnippet.save();
       
        res.status(201).json(savedSnippet);
    } catch (err) {
        res.status(400).json({ message: "Error saving snippet: " + err.message });
    }
});

// --- 4. DELETE A SNIPPET ---

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