import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Preloader({ onComplete, playBeep }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Menginisialisasi sistem visual 3D...');
  const [readyToEnter, setReadyToEnter] = useState(false);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressPercentRef = useRef(0);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // 1. Critical assets to pre-cache in browser
    const assetsToLoad = [
      '/assets/steve.png',
      '/assets/spiderman.png',
      '/assets/frontCard.png',
      '/assets/backCard.png',
      '/assets/goc_event_stage.jpg',
      '/assets/kanzler_grill_flame.jpg',
      '/assets/goc_roadshow.jpg'
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount += 1;
      };
      img.src = src;
    });

    // 2. Smooth progression animation
    const startTime = Date.now();
    const minDuration = 2000; // 2 seconds for a premium, non-rushed cinematic feel

    const statusSteps = [
      { threshold: 15, text: 'Memuat aset visual & tekstur 3D...' },
      { threshold: 40, text: 'Menyiapkan Portofolio Brand Activation...' },
      { threshold: 70, text: 'Mengorkestrasi panggung & simulasi fisik...' },
      { threshold: 90, text: 'Menghubungkan profil Steve Marvin...' },
      { threshold: 100, text: 'Selamat Datang di Portofolio Steve Marvin' }
    ];

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);
      const assetRatio = totalAssets > 0 ? loadedCount / totalAssets : 1;

      // Combined weighted progress
      const targetProgress = Math.min(Math.round((timeRatio * 0.7 + assetRatio * 0.3) * 100), 100);

      if (targetProgress > progressPercentRef.current) {
        progressPercentRef.current = targetProgress;
        setProgress(targetProgress);

        // Update status phrase
        for (let step of statusSteps) {
          if (targetProgress <= step.threshold) {
            setStatusText(step.text);
            break;
          }
        }
      }

      if (targetProgress >= 100 && elapsed >= minDuration) {
        clearInterval(interval);
        setReadyToEnter(true);
        triggerExit();
      }
    }, 35);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const triggerExit = () => {
    document.body.style.overflow = '';
    if (!containerRef.current || !contentRef.current) {
      onComplete?.();
      return;
    }

    playBeep?.(1200);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      }
    });

    // Content fade & scale
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.94,
      y: -30,
      duration: 0.6,
      ease: 'power3.inOut'
    });

    // Curtain sweep up smoothly
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut'
    }, '-=0.25');
  };

  const handleSkip = () => {
    triggerExit();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-white select-none overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/15 via-indigo-600/10 to-rose-500/15 rounded-full blur-3xl pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,16,0.8)_100%)] pointer-events-none" />

      {/* Main Center Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">
        {/* Glowing Avatar Orbit Stage */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          {/* Outer Rotating Cyber Tech Ring */}
          <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-sky-400/25 border-dashed animate-[spin_12s_linear_infinite]" />
          <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-rose-500/20 border-t-transparent animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-sky-500/20 to-rose-500/20 blur-xl animate-pulse" />

          {/* Central Steve Marvin Avatar */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.35)] bg-slate-900">
            <img
              src="/assets/steve.png"
              alt={personalInfo.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src = '/assets/me.png';
              }}
            />
          </div>

          {/* Spark Badge */}
          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-slate-900 border border-sky-400/50 text-cyan-400 shadow-md">
            ACT•V
          </span>
        </div>

        {/* Brand Name & Typography */}
        <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] sm:text-[11px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SUPERVISOR BRAND ACTIVATION</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-[0.2em] uppercase text-white font-sans drop-shadow-sm">
            {personalInfo.name}
          </h1>

          <p className="text-xs font-mono text-slate-400 tracking-wide">
            GOC (Purbasari • CleanFace • Amara • Onyx) • Ex KANZLER
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs space-y-3">
          {/* Progress Bar Track */}
          <div className="relative h-1.5 w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-800/80 shadow-inner">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-rose-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage & Status Label */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 truncate max-w-[200px] text-left text-[11px]">
              {statusText}
            </span>
            <span className="text-sky-400 font-bold tracking-wider ml-2">
              {progress}%
            </span>
          </div>
        </div>

        {/* Quick Skip Option */}
        <button
          type="button"
          onClick={handleSkip}
          className="mt-8 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors py-1 px-3 rounded-full hover:bg-slate-900/50"
        >
          {readyToEnter ? 'Klik untuk Masuk Langsung →' : 'Lewati →'}
        </button>
      </div>

      {/* Decorative Bottom Corner Tech Markers */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-400 hidden sm:block">
        STAGE ID: GOC-ACT-2026 // EXPERIENCE INITIALIZED
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-400 hidden sm:block">
        3D WEBGL • GSAP • THREE.JS
      </div>
    </div>
  );
}
