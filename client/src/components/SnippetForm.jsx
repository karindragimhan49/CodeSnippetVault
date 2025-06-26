'use client';

import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const SnippetForm = ({ onSnippetAdded }) => {
    // States for each input field
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [project, setProject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!title.trim() || !code.trim()) {
            // You can add a toast notification here for better UX
            alert('Title and Code cannot be empty!');
            return;
        }

        // Prepare the data to be sent
        const snippetData = {
            title: title.trim(),
            language: language,
            code: code.trim(),
            project: project.trim() || 'General' // If project is empty, default to 'General'
        };

        // Call the function passed from the parent (page.js)
        onSnippetAdded(snippetData);

        // Clear the form fields after submission
        setTitle('');
        setLanguage('javascript');
        setCode('');
        setProject('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-12 shadow-lg"
        >
            <h2 className="text-xl font-bold text-slate-100 mb-5">Create a New Snippet</h2>
            <div className="space-y-4">
                {/* --- Title Input --- */}
                <input
                    type="text"
                    placeholder="Snippet Title (e.g., 'React Fetch Hook')"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-slate-900 text-slate-300 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />

                {/* --- Project Input --- */}
                <input
                    type="text"
                    placeholder="Project Name (e.g., 'E-commerce Site')"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full p-3 bg-slate-900 text-slate-300 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />

                {/* --- Language Select --- */}
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 bg-slate-900 text-slate-300 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="typescript">TypeScript</option>
                    <option value="bash">Bash</option>
                </select>

                {/* --- Code Textarea --- */}
                <textarea
                    placeholder="Paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 p-3 bg-slate-900 text-slate-300 rounded-md border border-slate-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                ></textarea>
            </div>

            <button
                type="submit"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
                <PlusIcon className="h-5 w-5" />
                Add Snippet
            </button>
        </form>
    );
};

export default SnippetForm;