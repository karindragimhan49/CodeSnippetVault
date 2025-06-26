'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
    const [projects, setProjects] = useState(['All Projects']);
    const [selectedProject, setSelectedProject] = useState('All Projects');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSnippets = useCallback(async () => {
        try {
            setLoading(true);
            const res = await API.get('/snippets', {
                params: {
                    project: selectedProject,
                    search: searchTerm.trim()
                }
            });
            setSnippets(res.data);
        } catch (err) {
            console.error("Error fetching snippets:", err);
            toast.error("Could not fetch snippets. Is the server running?");
        } finally {
            setLoading(false);
        }
    }, [selectedProject, searchTerm]);

    const fetchProjects = async () => {
        try {
            const res = await API.get('/snippets/projects');
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };
    
    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchSnippets();
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [fetchSnippets]);

    const handleSnippetAdded = async (snippetData) => {
        console.log('--- DATA BEING SENT TO BACKEND ---', snippetData);


        try {
            const res = await API.post('/snippets', snippetData);
            setSnippets(prevSnippets => [res.data, ...prevSnippets]); // Optimistic update
            
            if (!projects.includes(snippetData.project)) {
                setProjects([...projects, snippetData.project]);
            }
            
            toast.success('Snippet added successfully!');
            scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuad' });
        } catch (err) {
            console.error("Error adding snippet:", err);
            toast.error(err.response?.data?.message || "Failed to add snippet.");
        }
    };

    const handleSnippetDeleted = async (deletedId) => {
        const originalSnippets = [...snippets];
        setSnippets(snippets.filter(s => s._id !== deletedId)); // Optimistic update
        try {
            await API.delete(`/snippets/${deletedId}`);
            toast.error('Snippet deleted.');
            fetchProjects(); // Refetch projects in case a project becomes empty
        } catch (err) {
            setSnippets(originalSnippets); // Revert on error
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
                        A clean, professional, and modern home for your most-used code snippets. Built with Next.js & Tailwind CSS.
                    </p>
                </header>
                
                <section className="max-w-3xl mx-auto">
                    <SnippetForm onSnippetAdded={handleSnippetAdded} />

                    <div className="my-8 p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:w-2/3 relative">
                             <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-10 bg-slate-900 text-slate-300 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                       
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full md:w-1/3 p-2 bg-slate-900 text-slate-300 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            {projects.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

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