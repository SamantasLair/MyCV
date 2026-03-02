"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Using Devicon Base URL
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface TechItem {
  name: string;
  icon: string;
  description: string;
  link: string;
  className: string; // Background color and text color classes
}

const TECH_CATEGORIES: { title: string; items: TechItem[] }[] = [
  {
    title: "Languages",
    items: [
      {
        name: "C++",
        icon: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
        description: "C++ is a cross-platform language that can be used to create high-performance applications.",
        link: "https://isocpp.org/",
        className: "bg-[#004275] text-white", // Dark Blue for C++
      },
      {
        name: "C",
        icon: `${DEVICON_BASE}/c/c-original.svg`,
        description: "A general-purpose, procedural computer programming language supporting structured programming.",
        link: "https://en.wikipedia.org/wiki/C_(programming_language)",
        className: "bg-[#283593] text-white", // Deep Indigo for C
      },
      {
        name: "JavaScript",
        icon: `${DEVICON_BASE}/javascript/javascript-original.svg`,
        description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        className: "bg-[#323330] text-[#F7DF1E]", // Dark Grey for JS base, Yellow Text (or just white)
      },
      {
        name: "Kotlin",
        icon: `${DEVICON_BASE}/kotlin/kotlin-original.svg`,
        description: "Kotlin is a modern but already mature programming language aimed to make developers happier.",
        link: "https://kotlinlang.org/docs/home.html",
        className: "bg-[#4e2893] text-white", // Purple for Kotlin
      },
      {
        name: "Java",
        icon: `${DEVICON_BASE}/java/java-original.svg`,
        description: "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself.",
        link: "https://docs.oracle.com/en/java/",
        className: "bg-[#d66c00] text-white", // Orange-ish for Java background ?? Or darker
      },
      {
        name: "Dart",
        icon: `${DEVICON_BASE}/dart/dart-original.svg`,
        description: "Dart is a client-optimized language for fast apps on any platform.",
        link: "https://dart.dev/guides",
        className: "bg-[#005c99] text-white", // Blue for Dart
      },
      {
        name: "PHP",
        icon: `${DEVICON_BASE}/php/php-original.svg`,
        description: "A popular general-purpose scripting language that is especially suited to web development.",
        link: "https://www.php.net/docs.php",
        className: "bg-[#474a8a] text-white", // Purple-Blue for PHP
      },
      {
        name: "Python",
        icon: `${DEVICON_BASE}/python/python-original.svg`,
        description: "Python is a programming language that lets you work quickly and integrate systems more effectively.",
        link: "https://www.python.org/doc/",
        className: "bg-[#1e415e] text-[#ffd43b]", // Dark Blue base, Yellowish text or white
      },
    ],
  },
  {
    title: "Frameworks & Ecosystem",
    items: [
      {
        name: "GoogleCloud",
        icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
        description: "Meet your business challenges head on with cloud computing services from Google.",
        link: "https://cloud.google.com/docs",
        className: "bg-[#1a73e8] text-white", // Google Blue
      },
      {
        name: "Vercel",
        icon: `${DEVICON_BASE}/vercel/vercel-original.svg`,
        description: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
        link: "https://vercel.com/docs",
        className: "bg-black text-white border border-white/20", // Black for Vercel
      },
      {
        name: "React",
        icon: `${DEVICON_BASE}/react/react-original.svg`,
        description: "The library for web and native user interfaces.",
        link: "https://react.dev/",
        className: "bg-[#20232a] text-[#61dafb]", // Dark React BG, Cyan Text
      },
      {
        name: "Anaconda",
        icon: `${DEVICON_BASE}/anaconda/anaconda-original.svg`,
        description: "The world's most popular open-source Python distribution platform.",
        link: "https://docs.anaconda.com/",
        className: "bg-[#2e7d32] text-white", // Green for Anaconda
      },
      {
        name: "JavaFX",
        icon: `${DEVICON_BASE}/java/java-original.svg`,
        description: "OpenJFX is an open source, next generation client application platform for desktop, mobile and embedded systems.",
        link: "https://openjfx.io/",
        className: "bg-[#b71c1c] text-white", // Dark Red (JavaFX doesn't have a strong brand color, using Red/Orange family)
      },
      {
        name: "Laravel",
        icon: `${DEVICON_BASE}/laravel/laravel-original.svg`,
        description: "The PHP Framework for Web Artisans.",
        link: "https://laravel.com/docs",
        className: "bg-[#ef3b2d] text-white", // Laravel Red
      },
      {
        name: "pNPM",
        icon: `${DEVICON_BASE}/pnpm/pnpm-original.svg`,
        description: "Fast, disk space efficient package manager.",
        link: "https://pnpm.io/motivation",
        className: "bg-[#3c3c3c] text-[#f69220]", // Dark grey bg, Orange pnpm color
      },
      {
        name: "npm",
        icon: `${DEVICON_BASE}/npm/npm-original-wordmark.svg`,
        description: "npm is the world's largest software registry.",
        link: "https://docs.npmjs.com/",
        className: "bg-[#cb3837] text-white", // npm Red
      },
      {
        name: "Vite",
        icon: `${DEVICON_BASE}/vitejs/vitejs-original.svg`,
        description: "Next Generation Frontend Tooling.",
        link: "https://vitejs.dev/guide/",
        className: "bg-[#646cff] text-white", // Vite Purple
      },
      {
        name: "Apache",
        icon: `${DEVICON_BASE}/apache/apache-original.svg`,
        description: "The simplistic, robust, HTTP server.",
        link: "https://httpd.apache.org/",
        className: "bg-[#d22128] text-white", // Apache Red
      },
      {
        name: "Firebase",
        icon: `${DEVICON_BASE}/firebase/firebase-original.svg`,
        description: "Firebase is an app development platform that helps you build and grow apps and games.",
        link: "https://firebase.google.com/docs",
        className: "bg-[#ffca28] text-black", // Firebase Yellow/Amber
      },
      {
        name: "MySQL",
        icon: `${DEVICON_BASE}/mysql/mysql-original.svg`,
        description: "The world's most popular open source database.",
        link: "https://dev.mysql.com/doc/",
        className: "bg-[#00618a] text-white", // MySQL Blue
      },
      {
        name: "Postgres",
        icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
        description: "The World's Most Advanced Open Source Relational Database.",
        link: "https://www.postgresql.org/docs/",
        className: "bg-[#336791] text-white", // Postgres Blue
      },
      {
        name: "SQLite",
        icon: `${DEVICON_BASE}/sqlite/sqlite-original.svg`,
        description: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
        link: "https://www.sqlite.org/docs.html",
        className: "bg-[#003b57] text-white", // Dark Navy
      },
      {
        name: "Canva",
        icon: `${DEVICON_BASE}/canva/canva-original.svg`,
        description: "Canva is a free-to-use online graphic design tool.",
        link: "https://www.canva.com/",
        className: "bg-[#00c4cc] text-white", // Canva Teal
      },
      {
        name: "Figma",
        icon: `${DEVICON_BASE}/figma/figma-original.svg`,
        description: "Figma is the leading collaborative design tool for building meaningful products.",
        link: "https://help.figma.com/",
        className: "bg-[#f24e1e] text-white", // Figma Orange/Red
      },
      {
        name: "Blender",
        icon: `${DEVICON_BASE}/blender/blender-original.svg`,
        description: "Blender is the free and open source 3D creation suite.",
        link: "https://docs.blender.org/",
        className: "bg-[#e87d0d] text-white", // Blender Orange
      },
      {
        name: "Matplotlib",
        icon: `${DEVICON_BASE}/matplotlib/matplotlib-original.svg`,
        description: "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.",
        link: "https://matplotlib.org/",
        className: "bg-white text-black", // Matplotlib often white bg
      },
      {
        name: "Numpy",
        icon: `${DEVICON_BASE}/numpy/numpy-original.svg`,
        description: "The fundamental package for scientific computing with Python.",
        link: "https://numpy.org/doc/stable/",
        className: "bg-[#013243] text-white", // Dark cyan/blue
      },
      {
        name: "Pandas",
        icon: `${DEVICON_BASE}/pandas/pandas-original.svg`,
        description: "pandas is a fast, powerful, flexible and easy to use open source data analysis and manipulation tool.",
        link: "https://pandas.pydata.org/docs/",
        className: "bg-[#130754] text-white", // Dark Purple/Navy
      },
      {
        name: "Scikit-Learn",
        icon: `${DEVICON_BASE}/scikitlearn/scikitlearn-original.svg`,
        description: "Simple and efficient tools for predictive data analysis.",
        link: "https://scikit-learn.org/stable/",
        className: "bg-[#f7931e] text-white", // Orange
      },
      {
        name: "TensorFlow",
        icon: `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,
        description: "An end-to-end open source platform for machine learning.",
        link: "https://www.tensorflow.org/learn",
        className: "bg-[#ff6f00] text-white", // Orange
      },
      {
        name: "Git",
        icon: `${DEVICON_BASE}/git/git-original.svg`,
        description: "Git is a free and open source distributed version control system.",
        link: "https://git-scm.com/doc",
        className: "bg-[#f05032] text-white", // Git Red/Orange
      },
    ],
  },
];

export const TechStack = () => {
  return (
    <div className="space-y-8 mt-8">
      {TECH_CATEGORIES.map((category) => (
        <div key={category.title} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider pl-1">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.items.map((tech) => (
              <div
                key={tech.name}
                className="group relative"
                data-particle-collider
              >
                {/* Dynamic Rectangular Badge */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-md", // Rectangular shape
                    tech.className, // Custom Background & Text Color
                    "shadow-[0_2px_10px_rgba(0,0,0,0.2)]", // Shadow
                    "transition-all duration-300",
                    "group-hover:scale-105 group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)] group-hover:brightness-110", // Hover
                    "cursor-default"
                  )}
                >
                  {/* Icon */}
                  <div className="relative w-5 h-5 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-full h-full object-contain filter drop-shadow-sm" 
                      loading="lazy" 
                    />
                  </div>
                  
                  {/* Text: ALL CAPS */}
                  <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>

                {/* Hover Card (Glassmorphism) */}
                <div 
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 z-50 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0",
                    "bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
                  )}
                >
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-900/95" />
                  
                  <div className="flex items-center gap-2 mb-2">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tech.icon} alt="" className="w-4 h-4 object-contain" />
                    <span className="font-bold text-white text-sm">{tech.name}</span>
                  </div>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 font-medium">
                    &quot;{tech.description}&quot;
                  </p>
                  
                  <a 
                    href={tech.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] text-blue-400 hover:text-blue-300 font-mono transition-colors w-fit"
                  >
                    Read Official Docs <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
