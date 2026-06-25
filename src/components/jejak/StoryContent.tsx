// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Server-Side Story Content Renderer
// Renders ALL story content as static HTML for SEO & web fetchers
// Client component only adds interactivity (scroll tracking, mark as read)
// ══════════════════════════════════════════════════════

import Link from 'next/link';
import Image from 'next/image';
import type { StoryEvent, Character, StoryLocation } from '@/data/content';
import JourneyProgress from './JourneyProgress';

export interface ParsedStory {
  opening: string[];
  story: StoryParagraph[];
  reflection: string[];
}

// ── Superscript number helper (for reference section) ──
const SUPERSCRIPT_DIGITS = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
function toSuperscript(n: number): string {
  return String(n).split('').map(d => SUPERSCRIPT_DIGITS[parseInt(d)]).join('');
}

// ── Convert Unicode superscript string to normal digits ──
// ¹²³ → "123"
function superscriptToNumber(sup: string): string {
  const map: Record<string, string> = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  };
  return sup.split('').map(c => map[c] ?? c).join('');
}

// ── Render text with inline citation badges + honorific typography ──
// Single digit  → lingkaran kecil   .citation-badge--single
// Multi digit   → pill/rounded rect  .citation-badge--multi
const CITATION_RE = /[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g;

// ── Inline entity link: [[Label|character:id]] or [[Label|location:id]] ──
// Renders as Next.js Link to /tokoh/xxx or /lokasi/xxx
const ENTITY_RE = /\[\[([^\]|]+)\|((?:character|location):[a-z0-9-]+)\]\]/g;

// ── Honorific typography ──
// Allah ﷻ → paling utama
// Rasulullah/Nabi Muhammad ﷺ → kedua setelah Allah
// عليه السلام → nabi lain, lebih ringan
const ALLAH_RE = /Allah\s*ﷻ/g;
const RASULULLAH_RE = /(?:Rasulullah|Nabi Muhammad|Muhammad)\s*ﷺ/g;
const ALAYHIS_SALAM_RE = /عليه\s*السلام/g;

function renderWithCitations(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Combine all match types into a single sweep
  type Match = { index: number; end: number; kind: 'citation' | 'entity' | 'allah' | 'rasulullah' | 'alayhis'; payload: string };
  const matches: Match[] = [];

  CITATION_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CITATION_RE.exec(text)) !== null) {
    matches.push({ index: m.index, end: CITATION_RE.lastIndex, kind: 'citation', payload: m[0] });
  }
  ENTITY_RE.lastIndex = 0;
  while ((m = ENTITY_RE.exec(text)) !== null) {
    matches.push({ index: m.index, end: ENTITY_RE.lastIndex, kind: 'entity', payload: m[1] + '||' + m[2] });
  }
  ALLAH_RE.lastIndex = 0;
  while ((m = ALLAH_RE.exec(text)) !== null) {
    matches.push({ index: m.index, end: ALLAH_RE.lastIndex, kind: 'allah', payload: m[0] });
  }
  RASULULLAH_RE.lastIndex = 0;
  while ((m = RASULULLAH_RE.exec(text)) !== null) {
    matches.push({ index: m.index, end: RASULULLAH_RE.lastIndex, kind: 'rasulullah', payload: m[0] });
  }
  ALAYHIS_SALAM_RE.lastIndex = 0;
  while ((m = ALAYHIS_SALAM_RE.exec(text)) !== null) {
    matches.push({ index: m.index, end: ALAYHIS_SALAM_RE.lastIndex, kind: 'alayhis', payload: m[0] });
  }
  matches.sort((a, b) => a.index - b.index);

  // ── Filter overlapping matches ──
  // Honorific regex (RASULULLAH_RE / ALLAH_RE / ALAYHIS_SALAM_RE) bisa match
  // di dalam label entity link (mis: "[[Muhammad ﷺ|character:muhammad-saw]]"
  // — "Muhammad ﷺ" juga match regex rasulullah). Tanpa filter, ini bikin
  // render dobel + sisa markup "|character:muhammad-saw]]." bocor ke text.
  // Solusi: skip match yang overlap dengan match sebelumnya (sort by index).
  const filtered: Match[] = [];
  let filterLastEnd = 0;
  for (const m of matches) {
    if (m.index >= filterLastEnd) {
      filtered.push(m);
      filterLastEnd = m.end;
    }
  }

  for (const match of filtered) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match.kind === 'citation') {
      const numbers = superscriptToNumber(match.payload);
      const digits = numbers.split('');
      const isSingle = digits.length === 1;
      const label = digits.join(',');
      const modifier = isSingle ? 'citation-badge--single' : 'citation-badge--multi';

      parts.push(
        <span
          key={`cit-${match.index}`}
          className={`citation-badge ${modifier}`}
          aria-label={`Referensi ${label}`}
        >
          {label}
        </span>
      );
    } else if (match.kind === 'allah') {
      // Allah ﷻ — treatment paling utama
      parts.push(
        <span key={`allah-${match.index}`} className="allah-mention">
          Allah<span className="honorific-jalla">ﷻ</span>
        </span>
      );
    } else if (match.kind === 'rasulullah') {
      // Rasulullah/Nabi Muhammad ﷺ — kedua setelah Allah
      const name = match.payload.replace(/\s*ﷺ/, '');
      parts.push(
        <span key={`rasul-${match.index}`} className="rasulullah-mention">
          {name}<span className="honorific-sallallahu">ﷺ</span>
        </span>
      );
    } else if (match.kind === 'alayhis') {
      // Nabi lain عليه السلام — lebih ringan, satu kesatuan
      // Frase Arabic utuh, jangan di-split (beda dengan ﷻ/ﷺ yang ligature tunggal)
      parts.push(
        <span key={`alayhis-${match.index}`} className="alayhis-mention">
          {match.payload}
        </span>
      );
    } else {
      const [label, target] = match.payload.split('||');
      const [type, id] = target.split(':');
      const href = type === 'character' ? `/tokoh/${id}` : `/lokasi/${id}`;
      parts.push(
        <Link
          key={`ent-${match.index}`}
          href={href}
          className="reader-entity-link"
        >
          {label}
        </Link>
      );
    }
    lastIndex = match.end;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

export interface QuranVerse {
  text: string;
  reference: string;
}

export interface StoryParagraph {
  type: 'text' | 'scene-break' | 'section-divider' | 'quran-verse';
  content: string;
  verse?: QuranVerse; // only for quran-verse type
}

export function parseStory(storyText: string): ParsedStory {
  const paragraphs = storyText.split('\n').filter((p) => p.trim());

  const opening: string[] = [];
  const story: StoryParagraph[] = [];
  const reflection: string[] = [];

  let section: 'opening' | 'story' | 'reflection' = 'opening';
  let pendingVerseText: string | null = null;

  for (const para of paragraphs) {
    const trimmed = para.trim();

    if (section === 'opening' && opening.length >= 1) {
      section = 'story';
    }

    // ── Reflection trigger ──
    if (trimmed.startsWith('⟩') || trimmed.startsWith('→')) {
      section = 'reflection';
      reflection.push(trimmed.slice(1).trim());
      continue;
    }

    if (trimmed === '---') {
      section = 'reflection';
      continue;
    }

    // ── Quran verse: » "text" followed by — QS reference ──
    if (trimmed.startsWith('»')) {
      // Extract the verse text (between » " and ")
      const verseMatch = trimmed.match(/^»\s*"(.+?)"/);
      if (verseMatch) {
        pendingVerseText = verseMatch[1];
      }
      continue; // Don't render the » line as a paragraph
    }

    // This line might be the Quran reference (— QS ...)
    if (pendingVerseText && trimmed.startsWith('—')) {
      const reference = trimmed.replace(/^—\s*/, '');
      if (section === 'opening') opening.pop(); // shouldn't happen but safety
      if (section === 'story') {
        story.push({
          type: 'quran-verse',
          content: pendingVerseText,
          verse: { text: pendingVerseText, reference },
        });
      }
      pendingVerseText = null;
      continue;
    }

    // If we had a pending verse but next line isn't reference, flush it
    if (pendingVerseText) {
      story.push({
        type: 'quran-verse',
        content: pendingVerseText,
        verse: { text: pendingVerseText, reference: '' },
      });
      pendingVerseText = null;
    }

    // ── Scene break: ◆ ──
    if (trimmed === '◆') {
      if (section === 'story') story.push({ type: 'scene-break', content: '' });
      continue;
    }

    // ── Section divider: ✦ ✦ ✦ ──
    if (trimmed === '✦ ✦ ✦' || /^✦\s+✦\s+✦$/.test(trimmed)) {
      if (section === 'story') story.push({ type: 'section-divider', content: '' });
      continue;
    }

    // ── Normal text ──
    if (section === 'opening') opening.push(trimmed);
    else if (section === 'story') story.push({ type: 'text', content: trimmed });
    else reflection.push(trimmed);
  }

  // Flush any remaining pending verse
  if (pendingVerseText) {
    story.push({
      type: 'quran-verse',
      content: pendingVerseText,
      verse: { text: pendingVerseText, reference: '' },
    });
  }

  const hasSections = opening.length > 0 && story.length > 0;
  return {
    opening: hasSections ? opening : [],
    story: hasSections ? story : paragraphs.map((p) => ({ type: 'text' as const, content: p })),
    reflection,
  };
}

interface StoryContentProps {
  event: StoryEvent;
  characters: Character[];
  location: StoryLocation | undefined;
  prevEvent: StoryEvent | null;
  nextEvent: StoryEvent | null;
}

export default function StoryContent({
  event,
  characters,
  location,
  prevEvent,
  nextEvent,
}: StoryContentProps) {
  const parsed = parseStory(event.story);
  const separatorColor = 'rgba(44, 36, 24, 0.10)';

  return (
    <div className="min-h-screen bg-paper dark:bg-navy-deep reader-transition">
      {/* Content */}
      <div className="pt-20 sm:pt-24 pb-24 px-5 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* ─── HEADER ─── */}
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-ink-soft dark:text-sand">
            <span>{event.year}</span>
            {location && (
              <>
                <span className="text-ink/20 dark:text-sand/20">·</span>
                <Link
                  href={`/lokasi`}
                  className="transition-colors duration-200 hover:underline text-ink-soft dark:text-sand hover:text-ink dark:hover:text-cream"
                >
                  {location.name}
                </Link>
              </>
            )}
          </div>

          {/* ─── HERO ILLUSTRATION ─── */}
          {event.image && (
            <div className="reader-hero-image -mx-5 sm:-mx-6 mb-8 sm:mb-10">
              <Image
                src={event.image}
                alt=""
                width={1344}
                height={768}
                priority
                className="w-full h-auto object-cover"
                sizes="(max-width: 65ch) 100vw, 65ch"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold leading-[1.15] mb-2 text-ink dark:text-cream">
            {event.title}
          </h1>
          <p className="font-serif-display text-lg italic mb-3 text-ink-soft dark:text-sand">
            {event.subtitle}
          </p>
          <div className="h-px w-12 mb-12 sm:mb-16 bg-gold/40 dark:bg-lantern-mid/40" />

          {/* ─── OPENING SCENE ─── */}
          {parsed.opening.length > 0 && (
            <div className="reader-content mb-8 text-ink-soft dark:text-sand">
              {parsed.opening.map((paragraph, i) => (
                <p key={`opening-${i}`}>{renderWithCitations(paragraph)}</p>
              ))}
            </div>
          )}

          {/* ─── STORY ─── */}
          <article className="reader-content text-ink dark:text-cream">
            {parsed.story.map((paragraph, i) => {
              if (paragraph.type === 'scene-break') {
                return (
                  <div key={`scene-${i}`} className="reader-scene-break text-ink-soft dark:text-sand" aria-hidden="true">
                    <span className="reader-scene-break-dot" />
                  </div>
                );
              }

              if (paragraph.type === 'section-divider') {
                return (
                  <div key={`divider-${i}`} className="reader-section-divider text-ink-soft dark:text-sand" aria-hidden="true">
                    <span className="reader-section-divider-star">✦</span>
                    <span className="reader-section-divider-star">✦</span>
                    <span className="reader-section-divider-star">✦</span>
                  </div>
                );
              }

              if (paragraph.type === 'quran-verse' && paragraph.verse) {
                return (
                  <div key={`verse-${i}`} className="reader-quran-verse">
                    <div className="reader-quran-verse-text">
                      &ldquo;{paragraph.verse.text}&rdquo;
                    </div>
                    {paragraph.verse.reference && (
                      <div className="reader-quran-verse-ref">{paragraph.verse.reference}</div>
                    )}
                  </div>
                );
              }

              return <p key={`story-${i}`}>{renderWithCitations(paragraph.content)}</p>;
            })}
          </article>

          {/* ─── REFLECTION ─── */}
          {parsed.reflection.length > 0 && (
            <div className="mt-12">
              <div className="h-px w-16 mb-8 bg-gold/40 dark:bg-lantern-mid/40" />
              <div className="reader-content text-left text-ink-soft italic dark:text-sand">
                {parsed.reflection.map((paragraph, i) => {
                  // Last paragraph = closing punchline → render standalone
                  // Note: panjang paragraph di-cek dari rendered label, bukan markup mentah.
                  // "Kota itu bernama [[Makkah|location:makkah]]." (markup 44 char)
                  // → rendered "Kota itu bernama Makkah." (24 char) — closing threshold 120.
                  const isClosing =
                    i === parsed.reflection.length - 1 &&
                    parsed.reflection.length > 1 &&
                    paragraph.length <= 120;

                  if (isClosing) {
                    return (
                      <p
                        key={`reflection-${i}`}
                        className="reader-closing font-medium text-gold dark:text-lantern-mid mt-12 mb-0"
                      >
                        {renderWithCitations(paragraph)}
                      </p>
                    );
                  }
                  return <p key={`reflection-${i}`}>{renderWithCitations(paragraph)}</p>;
                })}
              </div>
            </div>
          )}

          {/* ─── AFTER STORY: Metadata ─── */}
          <div className="mt-20 space-y-6">
            {/* Characters */}
            {characters.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink-soft dark:text-sand">
                  Tokoh Terkait
                </span>
                <div className="mt-3 space-y-2">
                  {characters.map((char) => (
                    <Link
                      key={char.id}
                      href="/tokoh"
                      className="group flex items-center gap-1.5 text-[15px] transition-colors duration-200 text-ink-soft dark:text-sand hover:text-gold dark:hover:text-lantern-mid"
                    >
                      {char.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink-soft dark:text-sand">
                  Lokasi
                </span>
                <div className="mt-3">
                  <Link
                    href="/lokasi"
                    className="group flex items-center gap-1.5 text-[15px] transition-colors duration-200 text-ink-soft dark:text-sand hover:text-gold dark:hover:text-lantern-mid"
                  >
                    {location.name}
                  </Link>
                </div>
              </div>
            )}

            {/* References — Rel Kelihatan */}
            {event.references.length > 0 && (
              <div className="reader-references-block">
                <div className="reader-references-title">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 1h6l4 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 8h4M5 10.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  Referensi
                </div>
                <ol className="reader-references-list">
                  {event.references.map((ref, i) => (
                    <li key={i} className="reader-references-item">
                      <span className="reader-references-number">{i + 1}.</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Editor Notes */}
            {event.editorNotes && event.editorNotes.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <details className="reader-references group">
                  <summary className="reader-references-summary">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink-soft dark:text-sand">
                      Catatan Editor
                    </span>
                    <svg
                      className="reader-references-chevron"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="mt-3 space-y-2.5">
                    {event.editorNotes.map((note, i) => (
                      <p key={i} className="text-sm italic leading-relaxed text-ink-soft dark:text-sand">
                        {note}
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            )}

            {/* ─── CONTINUE JOURNEY ─── */}
            <div className="pt-8" style={{ borderTop: `1px solid ${separatorColor}` }}>
              {nextEvent ? (
                <Link
                  href={`/bab/${nextEvent.id.replace('bab-', '')}`}
                  className="group text-left block"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gold dark:text-lantern-mid">
                    Lanjutkan Perjalanan
                  </span>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline text-ink dark:text-cream group-hover:text-gold dark:group-hover:text-lantern">
                    {nextEvent.title}
                  </h4>
                  <span className="text-sm mt-1.5 inline-flex items-center gap-1.5 font-medium text-ink-soft dark:text-sand">
                    {nextEvent.year}
                  </span>
                </Link>
              ) : prevEvent ? (
                <Link
                  href={`/bab/${prevEvent.id.replace('bab-', '')}`}
                  className="group text-left block"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink-soft dark:text-sand">
                    Ikuti Jejak Sebelumnya
                  </span>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline text-ink dark:text-cream group-hover:text-gold dark:group-hover:text-lantern">
                    {prevEvent.title}
                  </h4>
                  <span className="text-sm mt-1.5 inline-flex items-center gap-1.5 font-medium text-ink-soft dark:text-sand">
                    {prevEvent.year}
                  </span>
                </Link>
              ) : null}
            </div>

            {/* ─── JEJAK PERJALANAN — full progress map ─── */}
            <div className="pt-10 mt-8" style={{ borderTop: `1px solid ${separatorColor}` }}>
              <JourneyProgress currentEventId={event.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

