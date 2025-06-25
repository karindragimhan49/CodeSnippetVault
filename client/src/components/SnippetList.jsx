'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const SnippetList = ({ snippets, onSnippetDeleted }) => {
    
    const handleCopy = (codeToCopy) => {
        navigator.clipboard.writeText(codeToCopy);
        toast.success('Copied to clipboard!');
    };

    if (snippets.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-slate-800/50 border border-dashed border-slate-700 rounded-xl">
                <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-slate-200">No Snippets Found</h3>
                <p className="mt-1 text-slate-400">Try a different search or project filter.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {snippets.map(snippet => (
                <div key={snippet._id} id={`snippet-${snippet._id}`} className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:border-sky-500 hover:shadow-2xl">
                    <div className="p-4 flex justify-between items-start bg-slate-900/70 backdrop-blur-sm border-b border-slate-700">
                        <div>
                            <h3 className="text-lg font-bold text-slate-100">{snippet.title}</h3>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                                <span className="text-xs uppercase font-bold tracking-wider text-sky-400 bg-sky-900/50 px-2 py-1 rounded-full">{snippet.language}</span>
                                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">{snippet.project}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => handleCopy(snippet.code)}
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                                aria-label="Copy code"
                            >
                                <ClipboardDocumentIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => onSnippetDeleted(snippet._id)}
                                className="p-2 rounded-full text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                                aria-label="Delete snippet"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="text-sm">
                        <SyntaxHighlighter 
                            language={snippet.language} 
                            style={vscDarkPlus} 
                            showLineNumbers={true}
                            customStyle={{ margin: 0, padding: '1.25rem', backgroundColor: 'transparent' }}
                            wrapLines={true}
                        >
                            {snippet.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SnippetList;