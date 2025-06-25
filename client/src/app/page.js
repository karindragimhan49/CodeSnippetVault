'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import SnippetForm from '@/components/SnippetForm';
import SnippetList from '@/components/SnippetList';
import API from '@/api'; 


const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
    </div>
);

export default function HomePage() {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                setLoading(true);
                const res = await API.get('/snippets'); // GET request to our backend
                setSnippets(res.data);
            } catch (err) {
                console.error("Error fetching snippets:", err);
                toast.error("Could not fetch snippets. Is the server running?");
            } finally {
                setLoading(false);
            }
        };
        fetchSnippets();
    }, []);

    // --- Add Snippet ---
    const handleSnippetAdded = async (snippetData) => {
        try {
           
            const res = await API.post('/snippets', snippetData);
          
            setSnippets([res.data, ...snippets]);
            toast.success('Snippet added successfully!');
            scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuad' });
        } catch (err) {
            console.error("Error adding snippet:", err);
            toast.error(err.response?.data?.message || "Failed to add snippet.");
        }
    };

    // --- Delete Snippet ---
    const handleSnippetDeleted = async (deletedId) => {
        try {
            await API.delete(`/snippets/${deletedId}`);
            setSnippets(snippets.filter(s => s._id !== deletedId));
            toast.error('Snippet deleted.');
        } catch (err) {
            console.error("Error deleting snippet:", err);
            toast.error("Failed to delete snippet.");
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-200">
            <main className="container mx-auto px-4 py-8 md:py-16">
                 <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100">
                        Code Snippet <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500">Vault</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                       A sleek and organized home for your most-used code snippets — crafted for clarity, speed, and simplicity.
                      </p>
                </header>
                
                <section className="max-w-3xl mx-auto">
                    <SnippetForm onSnippetAdded={handleSnippetAdded} />
                    
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