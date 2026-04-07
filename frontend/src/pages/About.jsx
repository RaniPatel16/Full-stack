import React from 'react';
import { Mail, Globe, Shield, User, FileText, Database } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-blue-800 border-b-4 border-blue-900 rounded-sm p-10 text-white shadow-sm relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Shield className="w-64 h-64" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-widest mb-2 relative z-10">Department of Data Analytics</h1>
        <h2 className="text-xl font-medium text-blue-200 uppercase tracking-widest relative z-10 border-b border-blue-700 pb-4 mb-4">India Postal Services Information Portal</h2>
        
        <p className="text-blue-50 text-sm max-w-2xl relative z-10 leading-relaxed text-justify">
          The National PinTracker Portal is an authoritative web-based platform dedicated to the dissemination, query, and analysis of demographic postal index records across the Indian subcontinent. Developed strictly under government-styled administrative protocols, this application ensures zero-latency lookup for postal delivery zones.
        </p>
      </div>

      <div className="bg-white border text-blue-900 border-gray-300 rounded-sm p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-blue-700 pb-2">Technical Implementation Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-widest text-blue-700 uppercase flex items-center gap-2">
               <User className="h-4 w-4" /> Client Interface (Frontend)
            </h3>
            <div className="bg-gray-50 border border-gray-200 p-4 font-mono text-xs space-y-3">
              <p>› React.js 19.x Framework</p>
              <p>› Vite Build Server Module</p>
              <p>› Tailwind CSS v4 Styling</p>
              <p>› React Router Document Protocol</p>
              <p>› Recharts Data Visualization</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-widest text-blue-700 uppercase flex items-center gap-2">
               <Database className="h-4 w-4" /> Server Logic (Backend)
            </h3>
            <div className="bg-gray-50 border border-gray-200 p-4 font-mono text-xs space-y-3">
              <p>› Node.js Runtime Environment</p>
              <p>› Express Server Routing Engine</p>
              <p>› MongoDB Document Datastore</p>
              <p>› MongoMemoryServer Temp Storage</p>
              <p>› CSV Parser Streaming Module</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-blue-700 pb-2 mb-6">Administrative Contacts</h2>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-5 py-3 border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white rounded-sm transition font-bold uppercase text-xs tracking-wider">
              <Globe className="h-4 w-4" /> External Repository
            </a>
            <a href="mailto:admin@india-postal.gov.in" className="flex items-center gap-3 px-5 py-3 bg-blue-700 border-blue-800 text-white hover:bg-blue-800 rounded-sm transition font-bold uppercase text-xs tracking-wider">
              <FileText className="h-4 w-4" /> File Bug Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
