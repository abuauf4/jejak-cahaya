'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Moon } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      // Redirect to admin dashboard
      window.location.href = '/admin';
    } catch {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B16] flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A843]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#D4A843]/[0.02] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4A843]/10 border border-[#D4A843]/20 mb-4">
            <Moon className="w-7 h-7 text-[#D4A843]" />
          </div>
          <h1 className="font-serif-display text-2xl font-bold text-[#F0EBE0] mb-1">
            Jejak Cahaya
          </h1>
          <p className="text-sm text-[#8B8070]">
            Panel Admin
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#0F1629] rounded-2xl border border-[rgba(245,215,142,0.06)] shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(245,215,142,0.06)]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D4A843]" />
              <span className="text-sm font-medium text-[#F0EBE0]">Masuk ke Dashboard</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-[#8B8070] mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8070]/50" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors bg-white/[0.04] border border-[rgba(245,215,142,0.06)] focus:border-[#D4A843]/40 text-[#F0EBE0] placeholder:text-[#8B8070]/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[#8B8070] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8070]/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-colors bg-white/[0.04] border border-[rgba(245,215,142,0.06)] focus:border-[#D4A843]/40 text-[#F0EBE0] placeholder:text-[#8B8070]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8070]/50 hover:text-[#8B8070] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <p className="text-xs text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username.trim() || !password.trim()}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                loading || !username.trim() || !password.trim()
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:opacity-90 active:scale-[0.98]'
              } bg-[#D4A843] text-[#080B16]`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Masuk
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#8B8070]/30 mt-6">
          Jejak Cahaya &mdash; Platform Pengetahuan Islam
        </p>
      </motion.div>
    </div>
  );
}
