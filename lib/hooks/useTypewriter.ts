"use client";

import { useState, useEffect } from "react";

export function useTypewriter(
  phrases: string[],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2000
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentPhrase.substring(0, text.length + 1));
          if (text.length + 1 === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setText(currentPhrase.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
