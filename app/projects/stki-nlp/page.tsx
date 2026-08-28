"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Github,
  CheckCircle2,
  FileText,
  Play,
  RotateCw,
  Zap,
  Gauge,
  Flame,
  Scissors,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { GalacticSgaBackground } from "@/components/ui/GalacticSgaBackground";

// Standard Sample Presets demonstrating NLP operations conceptually
const SAMPLES = [
  {
    id: "ai",
    title: "AI & Machine Learning Corpus",
    text: "Algoritma kecerdasan buatan memproses korpus teks secara otomatis untuk klasifikasi.",
    tokens: ["algoritma", "kecerdasan", "buatan", "memproses", "korpus", "teks", "secara", "otomatis", "untuk", "klasifikasi"],
    stopwords: ["secara", "untuk"],
    stemmed: [
      { original: "algoritma", prefix: "", stem: "algoritma", suffix: "" },
      { original: "kecerdasan", prefix: "ke-", stem: "cerdas", suffix: "-an" },
      { original: "buatan", prefix: "", stem: "buat", suffix: "-an" },
      { original: "memproses", prefix: "mem-", stem: "proses", suffix: "" },
      { original: "korpus", prefix: "", stem: "korpus", suffix: "" },
      { original: "teks", prefix: "", stem: "teks", suffix: "" },
      { original: "otomatis", prefix: "", stem: "otomatis", suffix: "" },
      { original: "klasifikasi", prefix: "", stem: "klasifikasi", suffix: "" },
    ],
    predictedClass: "Teknologi & Informatika",
    confidence: 94,
    tfWeights: [
      { term: "cerdas", weight: "0.420", density: 85 },
      { term: "proses", weight: "0.385", density: 78 },
      { term: "klasifikasi", weight: "0.360", density: 72 },
      { term: "algoritma", weight: "0.310", density: 64 },
    ],
  },
  {
    id: "tourism",
    title: "Maritime Tourism Corpus",
    text: "Pemerintah mempromosikan destinasi wisata pantai dermaga boom bagi turis domestik.",
    tokens: ["pemerintah", "mempromosikan", "destinasi", "wisata", "pantai", "dermaga", "boom", "bagi", "turis", "domestik"],
    stopwords: ["bagi"],
    stemmed: [
      { original: "pemerintah", prefix: "pe-", stem: "perintah", suffix: "" },
      { original: "mempromosikan", prefix: "mem-", stem: "promosi", suffix: "-kan" },
      { original: "destinasi", prefix: "", stem: "destinasi", suffix: "" },
      { original: "wisata", prefix: "", stem: "wisata", suffix: "" },
      { original: "pantai", prefix: "", stem: "pantai", suffix: "" },
      { original: "dermaga", prefix: "", stem: "dermaga", suffix: "" },
      { original: "boom", prefix: "", stem: "boom", suffix: "" },
      { original: "turis", prefix: "", stem: "turis", suffix: "" },
      { original: "domestik", prefix: "", stem: "domestik", suffix: "" },
    ],
    predictedClass: "Pariwisata & Budaya",
    confidence: 92,
    tfWeights: [
      { term: "wisata", weight: "0.450", density: 90 },
      { term: "pantai", weight: "0.410", density: 82 },
      { term: "dermaga", weight: "0.390", density: 78 },
      { term: "promosi", weight: "0.320", density: 65 },
    ],
  },
];

// Semantic NLP Pipeline Stage Definitions
const PIPELINE_STAGES = [
  {
    idx: 0,
    title: "1. Tokenization",
    subtitle: "Stream Ingestion & Splitting",
    chamberLabel: "Stage 1 • Tokenization: Ingestion & Lexical Segmentation",
    icon: FileText,
  },
  {
    idx: 1,
    title: "2. Stopword Filtering",
    subtitle: "Lexicon Noise Elimination",
    chamberLabel: "Stage 2 • Stopword Filtering: Stop-List Pruning & Sieve",
    icon: Flame,
  },
  {
    idx: 2,
    title: "3. Morphological Stemming",
    subtitle: "Affix Stripping (Nazief-Adriani)",
    chamberLabel: "Stage 3 • Morphological Stemmer: Affix Dissection & Root Extraction",
    icon: Scissors,
  },
  {
    idx: 3,
    title: "4. TF-IDF Vectorization",
    subtitle: "Feature Weighting & Classification",
    chamberLabel: "Stage 4 • Vector Inference: TF-IDF Frequency Matrix & Category Lock",
    icon: Gauge,
  },
];

export default function StkiNlpSandboxPage() {
  const [selectedSample, setSelectedSample] = useState(SAMPLES[0]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  // Automated step progression loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRunning) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= 3) {
            setIsAutoRunning(false);
            try {
              confetti({ particleCount: 70, spread: 80, origin: { y: 0.65 } });
            } catch {
              // safe
            }
            return 3;
          }
          return prev + 1;
        });
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isAutoRunning]);

  const handleStartAutoCycle = () => {
    setActiveStep(0);
    setIsAutoRunning(true);
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 3D Soft Ambient Information & SGA Starfield Background */}
      <GalacticSgaBackground />

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-xl border-b border-emerald-500/20 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Galactic Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/SamantasLair/STKI-PelabelanOtomatis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors"
            >
              <Github size={14} />
              <span>STKI Repository</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-6 md:py-8 relative z-10 space-y-6">
        
        {/* Title & Presets Control Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Cpu size={12} className="text-emerald-400 animate-pulse" />
              <span>Natural Language Processing Pipeline Showcase</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Indonesian Text Classification Pipeline
            </h1>
          </div>

          {/* Preset Selector & Auto-Run Action */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Corpus:</span>
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  setActiveStep(0);
                  setIsAutoRunning(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  selectedSample.id === sample.id
                    ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/60 shadow-md shadow-emerald-500/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10"
                }`}
              >
                {sample.title}
              </button>
            ))}

            <button
              onClick={handleStartAutoCycle}
              disabled={isAutoRunning}
              className="px-3.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Play size={12} className={isAutoRunning ? "animate-spin text-emerald-400" : "fill-emerald-400 text-emerald-400"} />
              <span>{isAutoRunning ? "Running..." : "Auto-Run"}</span>
            </button>
          </div>
        </div>

        {/* ─── High-Readability Raw Corpus Stream Panel ───────────────────────── */}
        <div className="rounded-2xl bg-slate-950/85 border border-emerald-500/30 p-5 shadow-xl backdrop-blur-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Input Raw Text Stream</span>
            </span>
            <span className="text-slate-400 text-[11px] font-mono">
              {selectedSample.tokens.length} Words &bull; Indonesian Lexicon
            </span>
          </div>

          <div className="p-4 md:p-5 rounded-xl bg-black/60 border border-emerald-500/20 text-sm md:text-base font-mono text-emerald-100 leading-relaxed md:leading-loose">
            <span className="text-emerald-400 font-bold mr-2">&gt;&gt;</span>
            &quot;{selectedSample.text}&quot;
          </div>
        </div>

        {/* ─── Interactive Multi-Step Pipeline Workspace ─────────────────────── */}
        <div className="rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-emerald-500/30 p-5 md:p-7 shadow-2xl space-y-6">
          
          {/* Direct Non-Linear Navigation Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {PIPELINE_STAGES.map((step) => {
              const Icon = step.icon;
              const isCurrent = activeStep === step.idx;
              const isCompleted = activeStep > step.idx;

              return (
                <button
                  key={step.idx}
                  onClick={() => {
                    setActiveStep(step.idx);
                    setIsAutoRunning(false);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative group cursor-pointer ${
                    isCurrent
                      ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/40"
                      : isCompleted
                      ? "bg-white/[0.04] border-emerald-500/30 text-slate-300 hover:bg-white/[0.08]"
                      : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon size={15} className={isCurrent ? "text-emerald-300 animate-pulse" : "text-slate-400"} />
                      <span className="text-xs font-bold font-mono">{step.title}</span>
                    </div>
                    {isCompleted && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </div>

                  <span className="text-[10px] text-slate-400 block font-mono pl-6 truncate">
                    {step.subtitle}
                  </span>

                  {isCurrent && (
                    <motion.div
                      layoutId="activePipelineIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Pipeline Stage Chamber Viewport */}
          <div className="min-h-[310px] bg-[#020b10]/95 border border-emerald-500/25 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            
            {/* Chamber Status Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 text-xs font-mono text-emerald-400">
              <div className="flex items-center gap-2">
                <RotateCw size={14} className="animate-spin-slow text-emerald-400" />
                <span className="font-bold tracking-wide">
                  {PIPELINE_STAGES[activeStep].chamberLabel}
                </span>
              </div>
              <span className="text-[10px] text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                STATUS: EXECUTION READY
              </span>
            </div>

            {/* Dynamic Stage Visualizations */}
            <AnimatePresence mode="wait">
              {/* STAGE 1: Tokenization */}
              {activeStep === 0 && (
                <motion.div
                  key="mech-stage-0"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  className="py-4 space-y-4"
                >
                  {/* Hydraulic Ingestion Shove Track */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border border-emerald-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-800 rounded animate-bounce shadow-md shadow-emerald-500/30" />
                      <div className="w-2.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-800 rounded animate-bounce delay-150 shadow-md shadow-emerald-500/30" />
                      <span className="text-xs font-mono font-bold text-emerald-300">
                        Lexical Tokenizer Shove &amp; Ingestion Track
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5, 6].map((gear) => (
                        <div
                          key={gear}
                          className="w-3.5 h-3.5 rounded-full border border-dashed border-emerald-400/80 animate-spin-slow"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tokenized Word Chips */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-slate-300 block font-bold">
                      Extracted Lexical Tokens ({selectedSample.tokens.length} Units):
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {selectedSample.tokens.map((token, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -30, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{
                            delay: idx * 0.05,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          whileHover={{ scale: 1.08, y: -3 }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-b from-emerald-950/80 to-black border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-md flex items-center gap-2 cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-bold">{token}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: Stopword Filtering */}
              {activeStep === 1 && (
                <motion.div
                  key="mech-stage-1"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="py-4 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Retained Semantic Tokens */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-300 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-emerald-400" />
                          <span>Retained Content Tokens</span>
                        </span>
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedSample.tokens
                          .filter((t) => !selectedSample.stopwords.includes(t))
                          .map((t, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.04 }}
                              className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold"
                            >
                              {t}
                            </motion.span>
                          ))}
                      </div>
                    </div>

                    {/* Filtered Stopwords */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-rose-500/40 space-y-2.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs font-mono text-rose-300 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Flame size={14} className="text-rose-400" />
                          <span>Eliminated Stopwords (Stop-List)</span>
                        </span>
                        <span className="text-[10px] text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded font-mono">
                          FILTERED
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedSample.stopwords.map((s, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="px-2.5 py-1 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-mono line-through flex items-center gap-2"
                          >
                            <span className="font-bold">{s}</span>
                            <span className="text-[9px] text-rose-400 font-bold no-underline bg-rose-500/30 px-1 rounded">
                              [STOPWORD]
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: Morphological Stemming */}
              {activeStep === 2 && (
                <motion.div
                  key="mech-stage-2"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  className="py-4 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-2 font-bold text-emerald-400">
                      <Scissors size={14} className="text-cyan-400" />
                      <span>Nazief-Adriani Stemming: Affix Removal to Root Lemmas</span>
                    </span>
                    <span className="text-emerald-300 font-bold">8 Root Lemmas</span>
                  </div>

                  {/* Sliced Stem Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {selectedSample.stemmed.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        className="p-2.5 rounded-2xl bg-black/70 border border-emerald-500/35 space-y-1 text-xs font-mono relative overflow-hidden shadow-md"
                      >
                        <span className="text-[10px] text-slate-400 block truncate">{item.original}</span>
                        <div className="flex items-center gap-1 font-bold">
                          {item.prefix && (
                            <span className="text-rose-400 line-through text-[10px]">{item.prefix}</span>
                          )}
                          <span className="text-emerald-300 text-sm">{item.stem}</span>
                          {item.suffix && (
                            <span className="text-rose-400 line-through text-[10px]">{item.suffix}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: TF-IDF Vectorization */}
              {activeStep === 3 && (
                <motion.div
                  key="mech-stage-3"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  className="py-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    
                    {/* TF-IDF Vector Weight Matrix */}
                    <div className="space-y-2.5 p-4 bg-black/70 border border-emerald-500/30 rounded-2xl shadow-xl">
                      <span className="text-xs font-mono font-bold text-emerald-400 block uppercase tracking-wider">
                        TF-IDF Feature Weight Densities
                      </span>
                      <div className="space-y-2">
                        {selectedSample.tfWeights.map((tf, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-slate-200 font-bold">{tf.term}</span>
                              <span className="text-emerald-400 font-bold">{tf.weight}</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${tf.density}%` }}
                                transition={{ duration: 0.9, delay: idx * 0.1 }}
                                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Classification Class Inference Lock */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-black to-slate-950 border border-emerald-400/50 text-center space-y-2.5 shadow-2xl">
                      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/30">
                        <Gauge size={24} className="animate-pulse text-emerald-300" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block font-bold">
                        Predicted Topic Class
                      </span>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {selectedSample.predictedClass}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
                        <Zap size={12} className="text-emerald-400" />
                        <span>Confidence: {selectedSample.confidence}%</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── High-Visibility Navigation Action Bar ──────────────────────── */}
            <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
              <button
                onClick={() => {
                  setActiveStep((prev) => Math.max(0, prev - 1));
                  setIsAutoRunning(false);
                }}
                disabled={activeStep === 0}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 text-xs font-mono rounded-xl border border-white/10 transition-colors"
              >
                &larr; Previous Stage
              </button>

              <span className="text-xs font-mono text-slate-400">
                Stage {activeStep + 1} of 4: <span className="text-emerald-300 font-bold">{PIPELINE_STAGES[activeStep].title}</span>
              </span>

              {activeStep < 3 ? (
                <button
                  onClick={() => {
                    setActiveStep((prev) => Math.min(3, prev + 1));
                    setIsAutoRunning(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next: {PIPELINE_STAGES[activeStep + 1].title.split(". ")[1]}</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleStartAutoCycle}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw size={13} />
                  <span>Re-Execute Pipeline</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
