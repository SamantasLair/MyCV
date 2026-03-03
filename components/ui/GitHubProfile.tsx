"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
  hireable: boolean | null;
}

const FALLBACK: GitHubUser = {
  name: siteConfig.authorName,
  login: siteConfig.githubUsername,
  avatar_url: "https://avatars.githubusercontent.com/u/94610303?v=4",
  bio: "Software Engineer & Full-Stack Developer",
  public_repos: 38,
  followers: 1,
  html_url: `https://github.com/${siteConfig.githubUsername}`,
  hireable: true,
};

import { TechStack } from "./TechStack";

export const GitHubProfile = () => {
  const [user, setUser] = useState<GitHubUser>(FALLBACK);

  useEffect(() => {
    fetch(`https://api.github.com/users/${siteConfig.githubUsername}`)
      .then((res) => (res.ok ? res.json() : FALLBACK))
      .then((data) => setUser({ ...FALLBACK, ...data }))
      .catch(() => setUser(FALLBACK));
  }, []);

  return (
    <div id="profile" className="flex flex-col md:flex-row items-start gap-8">
      {/* Avatar - Sticky on Desktop */}
      <div className="md:sticky md:top-24 shrink-0 transition-all duration-500">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
          <div data-particle-collider className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-white/10 bg-neutral-900">
            <Image
              src={user.avatar_url}
              alt={user.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Social Links - Below Avatar */}
        <div id="contact" className="flex gap-3 justify-center mt-6">
          <Link
            id="github"
            href={user.html_url}
            target="_blank"
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-slate-400 hover:text-white"
          >
            <Github size={18} />
          </Link>
          <Link
            id="linkedin"
            href={siteConfig.linkedinUrl}
            target="_blank"
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-slate-400 hover:text-white"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-slate-400 hover:text-white"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>

      {/* Identity & Tech Stack */}
      <div className="flex-1 min-w-0 space-y-8">
        <div className="text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
              {user.name}
            </h1>
            <p className="text-sm text-blue-400 font-mono">@{user.login}</p>
          </div>
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
            {user.bio || "Software Engineer & Full-Stack Developer"}
          </p>
        </div>

        {/* New Tech Stack Component */}
        <TechStack />
      </div>
    </div>
  );
};
