import React, { useRef, useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Calendar,
  Zap,
  Eye
} from 'lucide-react';
import { personalInfo, educationData, experienceData } from '../data/portfolioData';

export default function About({ playBeep }) {
  const stageRef = useRef(null);
  const timeoutRef = useRef(null);
  const [spiderFullVisible, setSpiderFullVisible] = useState(false);

  const handlePointerMove = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const portrait = stage.querySelector('.about-portrait');
    if (!portrait) return;

    clearTimeout(timeoutRef.current);
    const rect = portrait.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    stage.style.setProperty('--hover-x', `${x}%`);
    stage.style.setProperty('--hover-y', `${y}%`);
    stage.classList.add('spider-hovered');
    stage.dataset.spiderVisible = 'true';
  };

  const handlePointerLeave = () => {
    const stage = stageRef.current;
    if (!stage || spiderFullVisible) return;

    delete stage.dataset.spiderVisible;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      stage.classList.remove('spider-hovered');
    }, 4000);
  };

  const toggleSpiderSuit = () => {
    const next = !spiderFullVisible;
    setSpiderFullVisible(next);
    playBeep?.(next ? 1100 : 450);

    const stage = stageRef.current;
    if (stage) {
      if (next) {
        stage.classList.add('spider-hovered');
        stage.dataset.spiderVisible = 'true';
        stage.style.setProperty('--hover-x', '50%');
        stage.style.setProperty('--hover-y', '50%');
      } else {
        delete stage.dataset.spiderVisible;
        stage.classList.remove('spider-hovered');
      }
    }
  };

  return (
    <section id="About" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs font-mono text-rose-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tentang Saya</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Menghubungkan <span className="gradient-text">Brand & Konsumen</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Eksplorasi strategi aktivasi brand, manajemen event berskala nasional, dan experiential marketing yang berkesan.
        </p>
      </div>

      {/* Main Grid: Portrait/Visual & Story Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
        {/* Left: Creative Interactive Spider-Man Portrait Stage */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={stageRef}
            className="about-portrait-stage group"
            aria-label="Portrait with Spider-Man suit hover effect"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={toggleSpiderSuit}
          >
            {/* Ambient Background Glow */}
            <div className="about-portrait-glow" />

            {/* Orbiting Tech Rings */}
            <span className="about-portrait-orbit about-portrait-orbit-one" />
            <span className="about-portrait-orbit about-portrait-orbit-two" />
            <span className="about-portrait-spark" />

            {/* Central Layered Portrait Container */}
            <div className="about-portrait">
              {/* Layer 1: Normal Portrait Photo */}
              <img
                src="/assets/steve.png"
                alt={personalInfo.name}
                className="about-person-image"
                onError={(e) => {
                  e.target.src = '/assets/me.png';
                }}
              />

              {/* Layer 2: Spider-Man Suit Overlay (Revealed on hover/glitch) */}
              <img
                src="/assets/spiderman.png"
                alt="Spider-Man Suit Effect"
                className="about-spider-image"
                aria-hidden="true"
                style={
                  spiderFullVisible
                    ? {
                        opacity: 1,
                        WebkitMaskImage: 'none',
                        maskImage: 'none',
                        animation: 'none',
                      }
                    : undefined
                }
              />
            </div>
          </div>

          {/* Interactive Spider-Man Hint & Toggle Button */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={toggleSpiderSuit}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shadow-md ${
                spiderFullVisible
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-red-500/20'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:border-red-500/40'
              }`}
            >
              <span className="text-sm">🕷️</span>
              <span>{spiderFullVisible ? 'Spidey Suit: ON (Klik untuk OFF)' : 'Spidey Sense: Sentuh / Hover Foto!'}</span>
              <Eye className="w-3.5 h-3.5 text-red-400" />
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              (Arahkan kursor ke foto untuk melihat efek kostum Spider-Man)
            </span>
          </div>
        </div>

        {/* Right: Narrative Bio & Highlights */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {personalInfo.aboutParagraphs.map((para, idx) => (
              <p key={idx} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                {para}
              </p>
            ))}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
            {personalInfo.stats.map((stat, i) => (
              <div
                key={i}
                className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/80 hover:border-sky-500/40 text-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="text-xl sm:text-3xl font-extrabold text-white gradient-text">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 mt-0.5 sm:mt-1 truncate">
                  {stat.label}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Pillars */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
            {[
              'Brand Activation Strategy',
              'Event Management & Planning',
              'GOC (Purbasari, Amara, Onyx, CleanFace)',
              'Ex KANZLER (Cimory Group)',
              'Experiential Marketing',
              'KOL & On-Ground Operations'
            ].map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300"
              >
                <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-rose-400 shrink-0" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Education & Experience Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Education Group */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-2">
            <GraduationCap className="w-6 h-6 text-rose-400" />
            <span>Pendidikan & Kualifikasi</span>
          </div>

          <div className="space-y-4">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/40 transition-all duration-200 shadow-md backdrop-blur-sm group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-rose-400/90 font-medium">
                      {edu.level} • {edu.department}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 text-slate-300">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience & Milestones */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-2">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <span>Pengalaman Profesional</span>
          </div>

          <div className="space-y-4">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all duration-200 shadow-md backdrop-blur-sm group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-purple-400/90 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 text-slate-300">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}

            {/* Quick highlight banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-slate-950/40 border border-rose-500/20 flex items-center justify-between">
              <div>
                <h5 className="text-sm font-semibold text-white">
                  Tertarik Berkolaborasi untuk Brand Activation?
                </h5>
                <p className="text-xs text-slate-400">
                  Siap merancang aktivasi kampanye brand, pameran berskala besar, atau roadshow nasional.
                </p>
              </div>
              <a
                href="#Contact"
                onClick={() => playBeep?.(700)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-white transition-colors shadow-md shadow-rose-500/30"
              >
                Hubungi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
