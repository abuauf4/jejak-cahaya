// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Hero Image Caption Toggle
// Toggle kecil di bawah hero illustration untuk expand/collapse
// keterangan ilustrasi. Default collapse biar gak ganggu reading flow.
//
// Color styling pakai Tailwind classes (guaranteed ke-keep di CSS output,
// dark: variant handle dark mode automatically via darkMode: "class").
// ══════════════════════════════════════════════════════

'use client';

import { useState } from 'react';

interface HeroCaptionToggleProps {
  /** Teks keterangan ilustrasi */
  caption: string;
}

export default function HeroCaptionToggle({ caption }: HeroCaptionToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hero-caption-wrapper">
      <button
        type="button"
        className="hero-caption-toggle text-ink-light hover:text-gold dark:text-sand dark:hover:text-lantern-mid font-medium"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="hero-caption-content"
      >
        <svg
          className="hero-caption-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* Camera body */}
          <path
            d="M3 9a2 2 0 0 1 2-2h2l1.5-2h7L17 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Lens */}
          <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          {/* Flash dot */}
          <circle cx="18" cy="10.5" r="0.6" fill="currentColor" />
        </svg>
        <span>Klik untuk melihat keterangan ilustrasi</span>
        <svg
          className={`hero-caption-chevron ${isOpen ? 'hero-caption-chevron--open' : ''}`}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id="hero-caption-content"
        className={`hero-caption-content ${isOpen ? 'hero-caption-content--open' : ''}`}
      >
        <p className="hero-caption-text text-ink-soft dark:text-sand bg-gold-soft/10 dark:bg-lantern-mid/5 border-l-2 border-gold-soft/60 dark:border-lantern-mid/50">
          <span className="hero-caption-label text-gold dark:text-lantern-mid font-semibold uppercase tracking-wide">
            Ilustrasi gambar:
          </span>{' '}
          {caption}
        </p>
      </div>
    </div>
  );
}
