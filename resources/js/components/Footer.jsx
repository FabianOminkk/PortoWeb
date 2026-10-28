import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ playBeep }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playBeep?.(900);
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6 text-center">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-sky-400/50 shadow-md shadow-sky-500/20 shrink-0">
              <img
                src="/assets/steve.png"
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-lg font-bold text-white tracking-wide">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-md group"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Clean Copyright */}
        <div className="text-xs text-slate-400 flex flex-col sm:flex-row items-center gap-2 pt-4 border-t border-slate-900 w-full justify-between">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-slate-400 font-mono text-[11px]">
            Supervisor Brand Activation & Event Management
          </p>
        </div>
      </div>
    </footer>
  );
}
