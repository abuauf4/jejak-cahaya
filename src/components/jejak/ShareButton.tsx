'use client';

import { useState, useCallback } from 'react';
import { Share2, Check, Copy, Twitter, MessageCircle } from 'lucide-react';
import { useNavigation } from '@/lib/store';

interface ShareButtonProps {
  title: string;
  subtitle?: string;
  path: string;
}

/**
 * ShareButton — Ajak musafir lain menelusuri jejak.
 * Web Share API kalau available, fallback ke copy link.
 */
export default function ShareButton({ title, subtitle, path }: ShareButtonProps) {
  const { theme } = useNavigation();
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  const shareText = subtitle ? `${title} — ${subtitle}` : title;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fullUrl]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — Jejak Cahaya`,
          text: shareText,
          url: fullUrl,
        });
      } catch {
        // User cancelled
      }
    }
  }, [title, shareText, fullUrl]);

  const handleTwitter = useCallback(() => {
    const text = encodeURIComponent(`${shareText} — Jejak Cahaya`);
    const url = encodeURIComponent(fullUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }, [shareText, fullUrl]);

  const handleWhatsApp = useCallback(() => {
    const text = encodeURIComponent(`${shareText}\n\n${fullUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }, [shareText, fullUrl]);

  // If Web Share API is available, show single share button
  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  if (hasNativeShare) {
    return (
      <button
        onClick={handleNativeShare}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          isLight
            ? 'text-ink-soft hover:text-gold hover:bg-gold/[0.06]'
            : 'text-sand hover:text-lantern-mid hover:bg-lantern-mid/[0.06]'
        }`}
        aria-label="Bagikan"
      >
        <Share2 className="w-3.5 h-3.5" />
        Bagikan
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          isLight
            ? 'text-ink-soft hover:text-gold hover:bg-gold/[0.06]'
            : 'text-sand hover:text-lantern-mid hover:bg-lantern-mid/[0.06]'
        }`}
        aria-label="Bagikan"
      >
        <Share2 className="w-3.5 h-3.5" />
        Bagikan
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div
            className={`absolute right-0 bottom-full mb-2 z-50 rounded-xl border shadow-lg py-2 min-w-[180px] ${
              isLight
                ? 'bg-white border-ink/10'
                : 'bg-navy border-sand/10'
            }`}
          >
            <button
              onClick={handleTwitter}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                isLight ? 'text-ink-soft hover:bg-ink/[0.04]' : 'text-sand hover:bg-sand/[0.04]'
              }`}
            >
              <Twitter className="w-3.5 h-3.5" />
              Twitter / X
            </button>
            <button
              onClick={handleWhatsApp}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                isLight ? 'text-ink-soft hover:bg-ink/[0.04]' : 'text-sand hover:bg-sand/[0.04]'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <div className={`h-px mx-3 my-1 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
            <button
              onClick={handleCopy}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                isLight ? 'text-ink-soft hover:bg-ink/[0.04]' : 'text-sand hover:bg-sand/[0.04]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Salin Tautan
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
