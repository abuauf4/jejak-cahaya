// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Server-Side Story Content Renderer
// Renders ALL story content as static HTML for SEO & web fetchers
// Client component only adds interactivity (scroll tracking, mark as read)
// ══════════════════════════════════════════════════════

import Link from 'next/link';
import type { StoryEvent, Character, StoryLocation } from '@/data/content';

export interface ParsedStory {
  opening: string[];
  story: string[];
  reflection: string[];
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

          {/* Title */}
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold leading-[1.15] mb-2 text-ink dark:text-cream">
            {event.title}
          </h1>
          <p className="font-serif-display text-lg italic mb-12 sm:mb-16 text-ink-soft dark:text-sand">
            {event.subtitle}
          </p>

          {/* ─── OPENING SCENE ─── */}
          {parsed.opening.length > 0 && (
            <div className="reader-content mb-8 text-ink-soft dark:text-sand">
              {parsed.opening.map((paragraph, i) => (
                <p key={`opening-${i}`}>{paragraph}</p>
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

              return <p key={`story-${i}`}>{paragraph.content}</p>;
            })}
          </article>

          {/* ─── REFLECTION ─── */}
          {parsed.reflection.length > 0 && (
            <div className="mt-12">
              <div className="h-px w-16 mb-8 bg-gold/40 dark:bg-lantern-mid/40" />
              <div className="reader-content text-left text-ink-soft italic dark:text-sand">
                {parsed.reflection.map((paragraph, i) => {
                  // Last paragraph = closing punchline → render standalone
                  const isClosing =
                    i === parsed.reflection.length - 1 &&
                    parsed.reflection.length > 1 &&
                    paragraph.length <= 120;

                  if (isClosing) {
                    return (
                      <p
                        key={`reflection-${i}`}
                        className="reader-closing text-center not-italic font-serif-display font-bold text-xl sm:text-2xl mt-16 mb-0 text-gold dark:text-lantern-mid"
                      >
                        {paragraph}
                      </p>
                    );
                  }
                  return <p key={`reflection-${i}`}>{paragraph}</p>;
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

            {/* References */}
            {event.references.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-ink-soft dark:text-sand">
                  Referensi
                </span>
                <div className="mt-3 space-y-1.5">
                  {event.references.map((ref, i) => (
                    <p key={i} className="text-sm text-ink-soft dark:text-sand">
                      {ref}
                    </p>
                  ))}
                </div>
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
                    Sebelumnya
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
          </div>
        </div>
      </div>
    </div>
  );
}
