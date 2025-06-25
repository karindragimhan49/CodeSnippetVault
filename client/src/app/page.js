'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // <-- Import කරන්න
import { animateScroll as scroll } from 'react-scroll'; // <-- Import කරන්න
import SnippetForm from '@/components/SnippetForm';
import SnippetList from '@/components/SnippetList';

// Mock Data
const initialSnippets = [
    { _id: 1, title: "Async Data Fetching Hook", language: "typescript", code: `import { useState, useEffect } from 'react';\n\nfunction useFetch<T>(url: string) {\n  // ...\n}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
    { _id: 2, title: "Python FastAPI Endpoint", language: "python", code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}` },
];

// --- Loading Spinner Component ---
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
    </div>
);

export default function HomePage() {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true); // <-- Loading state එක

    useEffect(() => {
        // Simulate API loading time
        const timer = setTimeout(() => {
            setSnippets(initialSnippets);
            setLoading(false);
        }, 1500); // 1.5 seconds delay

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const handleSnippetAdded = (newSnippet) => {
        setSnippets([newSnippet, ...snippets]);
        toast.success('Snippet added successfully!'); // <-- Notification එක
        scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuad' }); // <-- Smooth Scroll
    };

    const handleSnippetDeleted = (deletedId) => {
        setSnippets(snippets.filter(s => s._id !== deletedId));
        toast.error('Snippet deleted.'); // <-- Notification එක
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-200">
            <main className="container mx-auto px-4 py-8 md:py-16">
                 <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100">
                        Code Snippet <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500">Vault</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        A clean, professional, and modern home for your most-used code snippets. Built with Next.js & Tailwind CSS.
                    </p>
                </header>
                
                <section className="max-w-3xl mx-auto">
                    <SnippetForm onSnippetAdded={handleSnippetAdded} />
                    
                    {/* --- Conditional Rendering --- */}
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <SnippetList snippets={snippets} onSnippetDeleted={handleSnippetDeleted} />
                    )}
                </section>
            </main>
        </div>
    );
}