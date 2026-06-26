// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Hero Image Caption Toggle
// Toggle kecil di bawah hero illustration untuk expand/collapse
// keterangan ilustrasi. Default collapse biar gak ganggu reading flow.
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
        className="hero-caption-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="hero-caption-content"
      >
        <svg
          className="hero-caption-icon"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h3.5l1.2-2h8.6l1.2 2H21v12H3V7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Keterangan ilustrasi</span>
        <svg
          className={`hero-caption-chevron ${isOpen ? 'hero-caption-chevron--open' : ''}`}
          width="9"
          height="9"
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
        <p className="hero-caption-text">
          <span className="hero-caption-label">Ilustrasi gambar:</span> {caption}
        </p>
      </div>
    </div>
  );
}
