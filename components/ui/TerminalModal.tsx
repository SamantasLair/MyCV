"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

const INITIAL_WELCOME: CommandLog = {
  id: "welcome",
  command: "system.init",
  output: (
    <div className="space-y-1 text-slate-300">
      <div className="text-emerald-400 font-bold">
        ╔══════════════════════════════════════════════════════════╗<br />
        ║ &nbsp;SAMUEL ANANTA — DEVELOPER CLI SHELL v2.4.0 (x86_64) &nbsp;║<br />
        ╚══════════════════════════════════════════════════════════╝
      </div>
      <p className="text-slate-400 text-xs">
        Type <span className="text-cyan-400 font-bold">&apos;help&apos;</span> to view available commands or <span className="text-cyan-400 font-bold">&apos;exit&apos;</span> to close.
      </p>
    </div>
  ),
};

export const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([INITIAL_WELCOME]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();

    let response: React.ReactNode = null;

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1 text-xs">
            <div className="text-slate-400">Available commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-slate-300 pt-1">
              <div><span className="text-cyan-400 font-bold">whoami</span> — Profile &amp; Bio overview</div>
              <div><span className="text-cyan-400 font-bold">skills</span> — Technical languages &amp; frameworks</div>
              <div><span className="text-cyan-400 font-bold">projects</span> — Key portfolio repositories</div>
              <div><span className="text-cyan-400 font-bold">resume</span> — View &amp; Print verified CV</div>
              <div><span className="text-cyan-400 font-bold">contact</span> — Email, LinkedIn, &amp; socials</div>
              <div><span className="text-cyan-400 font-bold">matrix</span> — Cyber animation easter egg</div>
              <div><span className="text-cyan-400 font-bold">clear</span> — Wipe terminal output</div>
              <div><span className="text-cyan-400 font-bold">sudo</span> — Root privileges test</div>
              <div><span className="text-cyan-400 font-bold">exit</span> — Close terminal sandbox</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong className="text-white">Name:</strong> {siteConfig.authorName}</p>
            <p><strong className="text-white">Role:</strong> Software Engineer &amp; Full-Stack Architect</p>
            <p><strong className="text-white">Location:</strong> {siteConfig.location}</p>
            <p><strong className="text-white">Status:</strong> <span className="text-emerald-400">Open for Opportunities &amp; Freelance Work</span></p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">Languages:</p>
            <p className="pl-2">TypeScript, JavaScript, Python, C++, Java, Kotlin, Dart, PHP, C, SQL</p>
            <p className="text-purple-400 font-bold pt-1">Frameworks &amp; Tools:</p>
            <p className="pl-2">Next.js 16, React 19, Vue.js, Tailwind CSS 4, Laravel, Scikit-Learn, TensorFlow, Git, Vercel</p>
          </div>
        );
        break;

      case "resume":
      case "cv":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">[CURRICULUM VITAE]:</p>
            <p>Access verified interactive digital resume and printable PDF matrix:</p>
            <p className="pt-1">
              &rarr; <a href="/resume" className="text-cyan-400 underline font-bold">samuel-ananta.vercel.app/resume</a>
            </p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><span className="text-blue-400 font-bold">ExamPrep</span> — Assessment Engine (<a href="https://exam-prep-eosin.vercel.app" target="_blank" className="text-cyan-400 underline">exam-prep-eosin.vercel.app</a>)</p>
            <p><span className="text-teal-400 font-bold">DermagaBoom</span> — Tourism Portal (<a href="https://dermaga-boom.vercel.app" target="_blank" className="text-cyan-400 underline">dermaga-boom.vercel.app</a>)</p>
            <p><span className="text-emerald-400 font-bold">STKI-NLP</span> — Live Interactive Sandbox (<a href="/projects/stki-nlp" className="text-cyan-400 underline">/projects/stki-nlp</a>)</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-cyan-400 underline">{siteConfig.email}</a></p>
            <p><strong>GitHub:</strong> <a href={`https://github.com/${siteConfig.githubUsername}`} target="_blank" className="text-cyan-400 underline">@{siteConfig.githubUsername}</a></p>
            <p><strong>LinkedIn:</strong> <a href={siteConfig.linkedinUrl} target="_blank" className="text-cyan-400 underline">{siteConfig.linkedinUrl}</a></p>
          </div>
        );
        break;

      case "matrix":
        response = (
          <div className="text-emerald-500 font-mono text-xs leading-relaxed animate-pulse">
            01000001 01001110 01010100 01001001 01000111 01010010 01000001 01010110 01001001 01010100 01011001<br />
            Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇
          </div>
        );
        break;

      case "sudo":
        response = (
          <div className="text-amber-400 text-xs">
            [ACCESS GRANTED]: You are authorized with root permissions to explore this portfolio!
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "exit":
        onClose();
        setInput("");
        return;

      default:
        response = (
          <div className="text-rose-400 text-xs">
            command not found: {cmd}. Type <span className="text-cyan-400 font-bold">&apos;help&apos;</span> for a list of commands.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: response,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`relative w-full ${
              isMaximized ? "max-w-6xl h-[90vh]" : "max-w-2xl h-[550px]"
            } bg-[#060913] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 flex flex-col overflow-hidden text-slate-200 font-mono z-10 transition-all duration-300`}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
                  aria-label="Close"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity"
                  aria-label="Maximize"
                />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <TerminalIcon size={14} className="text-cyan-400" />
                <span>samuel@portfolio: ~ (bash)</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm custom-scrollbar cursor-text"
            >
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  {log.command !== "system.init" && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-emerald-400 font-bold">samuel@portfolio:~$</span>
                      <span className="text-white">{log.command}</span>
                    </div>
                  )}
                  <div>{log.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-emerald-400 font-bold shrink-0">samuel@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white focus:outline-none caret-cyan-400"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>

              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
