'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Check,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  BookOpen,
  Scale,
  PenLine,
  FlaskConical,
  Globe,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Feedback {
  id: string;
  name: string | null;
  category: string;
  message: string;
  page: string | null;
  read: boolean;
  createdAt: string;
}

const categoryConfig: Record<string, { label: string; icon: typeof Globe; color: string }> = {
  umum: { label: 'Umum', icon: Globe, color: 'bg-gray-500/10 text-gray-600' },
  koreksi: { label: 'Koreksi Ilmiah', icon: Scale, color: 'bg-red-500/10 text-red-600' },
  referensi: { label: 'Referensi', icon: BookOpen, color: 'bg-blue-500/10 text-blue-600' },
  penulisan: { label: 'Penulisan', icon: PenLine, color: 'bg-green-500/10 text-green-600' },
  review: { label: 'Review', icon: FlaskConical, color: 'bg-purple-500/10 text-purple-600' },
};

export default function AdminPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'semua') params.set('category', filter);
      if (showUnreadOnly) params.set('unread', 'true');

      const res = await fetch(`/api/feedback?${params}`);
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
      setTotal(data.total || 0);
      setUnread(data.unread || 0);
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, showUnreadOnly]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      await fetch(`/api/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentRead }),
      });
      fetchFeedbacks();
    } catch (err) {
      console.error('Failed to toggle read:', err);
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Hapus masukan ini?')) return;
    try {
      await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      fetchFeedbacks();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const markAllRead = async () => {
    for (const fb of feedbacks.filter((f) => !f.read)) {
      await fetch(`/api/feedback/${fb.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
    }
    fetchFeedbacks();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#080B16] text-[#F0EBE0]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#080B16]/90 backdrop-blur-md border-b border-[rgba(245,215,142,0.06)]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[#8B8070]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif-display text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4A843]" />
                Admin Masukan
              </h1>
              <p className="text-xs text-[#8B8070] mt-0.5">
                {total} masukan · {unread} belum dibaca
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#D4A843] hover:underline px-2 py-1"
              >
                Tandai semua dibaca
              </button>
            )}
            <button
              onClick={fetchFeedbacks}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[#8B8070]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-[#8B8070] hover:text-red-400"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
        {['semua', 'umum', 'koreksi', 'referensi', 'penulisan', 'review'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-[#D4A843]/15 text-[#D4A843] border border-[#D4A843]/30'
                : 'bg-white/[0.03] text-[#8B8070] border border-[rgba(245,215,142,0.04)] hover:border-[rgba(245,215,142,0.12)]'
            }`}
          >
            {cat === 'semua' ? 'Semua' : categoryConfig[cat]?.label || cat}
          </button>
        ))}
        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            showUnreadOnly
              ? 'bg-[#D4A843]/15 text-[#D4A843]'
              : 'bg-white/[0.03] text-[#8B8070]'
          }`}
        >
          <EyeOff className="w-3 h-3" />
          Belum dibaca
        </button>
      </div>

      {/* Feedback list */}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-[#8B8070] animate-spin" />
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-10 h-10 text-[#8B8070]/30 mx-auto mb-3" />
            <p className="text-[#8B8070] text-sm">Belum ada masukan</p>
          </div>
        ) : (
          <div className="space-y-2">
            {feedbacks.map((fb) => {
              const cat = categoryConfig[fb.category] || categoryConfig.umum;
              const CatIcon = cat.icon;
              const isExpanded = expandedId === fb.id;

              return (
                <div
                  key={fb.id}
                  className={`rounded-xl border transition-colors ${
                    fb.read
                      ? 'bg-[#0F1629]/50 border-[rgba(245,215,142,0.04)]'
                      : 'bg-[#0F1629] border-[rgba(245,215,142,0.08)]'
                  }`}
                >
                  <div
                    className="px-4 py-3.5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          {!fb.read && (
                            <span className="w-2 h-2 rounded-full bg-[#D4A843] shrink-0" />
                          )}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${cat.color}`}>
                            <CatIcon className="w-3 h-3" />
                            {cat.label}
                          </span>
                          <span className="text-[10px] text-[#8B8070]/50">
                            {formatDate(fb.createdAt)}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          isExpanded ? '' : 'line-clamp-2'
                        } ${fb.read ? 'text-[#8B8070]' : 'text-[#F0EBE0]'}`}>
                          {fb.message}
                        </p>
                        {!isExpanded && (
                          <div className="flex items-center gap-2 mt-1.5">
                            {fb.name && (
                              <span className="text-[10px] text-[#8B8070]/50">
                                dari {fb.name}
                              </span>
                            )}
                            {fb.page && (
                              <span className="text-[10px] text-[#8B8070]/30">
                                {fb.page}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[rgba(245,215,142,0.04)] pt-3">
                      <p className="text-sm text-[#F0EBE0] leading-relaxed whitespace-pre-wrap mb-3">
                        {fb.message}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-[#8B8070]/50 mb-3">
                        {fb.name && <span>dari <strong className="text-[#8B8070]">{fb.name}</strong></span>}
                        {fb.page && <span>halaman: {fb.page}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleRead(fb.id, fb.read); }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            fb.read
                              ? 'bg-white/[0.03] text-[#8B8070] hover:bg-white/[0.06]'
                              : 'bg-[#D4A843]/10 text-[#D4A843] hover:bg-[#D4A843]/20'
                          }`}
                        >
                          {fb.read ? <EyeOff className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                          {fb.read ? 'Tandai belum dibaca' : 'Tandai dibaca'}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteFeedback(fb.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
