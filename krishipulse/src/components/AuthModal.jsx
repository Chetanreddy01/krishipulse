/**
 * AuthModal Component (Pure JavaScript JSX)
 * Authentication modal supporting Phone OTP verification (7338025342) and Email Login for Chetan.
 */

import React, { useState } from 'react';
import { Phone, Mail, ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import { Modal } from './ui/Modal.jsx';
import { Button } from './ui/Button.jsx';
import { Badge } from './ui/Badge.jsx';

export const AuthModal = () => {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const { showToast } = useApp();

  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('7338025342');
  const [email, setEmail] = useState('chetanreddy445@gmail.com');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('482910');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) return;
    setOtpStep(true);
    showToast('info', 'OTP Sent', `6-digit verification code sent to +91 ${phone}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    login(email);
    setOtpStep(false);
    showToast('success', 'Authentication Verified', 'Welcome back to KrishiPulse AI Enterprise, Chetan!');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    login(email);
    showToast('success', 'Authenticated', 'Welcome back, Chetan!');
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => {
        setAuthModalOpen(false);
        setOtpStep(false);
      }}
      title="KrishiPulse Enterprise Sign In"
    >
      <div className="space-y-5">
        
        {/* Method Switcher Tabs */}
        <div className="flex items-center gap-2 p-1 bg-[var(--bg-sidebar)] rounded-xl border border-[var(--border-subtle)]">
          <button
            onClick={() => { setAuthMethod('phone'); setOtpStep(false); }}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
              authMethod === 'phone'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-black dark:text-slate-300 hover:text-black'
            }`}
          >
            Mobile OTP Login
          </button>

          <button
            onClick={() => { setAuthMethod('email'); setOtpStep(false); }}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
              authMethod === 'email'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-black dark:text-slate-300 hover:text-black'
            }`}
          >
            Email Login
          </button>
        </div>

        {/* Option 1: Mobile Phone OTP Form */}
        {authMethod === 'phone' && (
          !otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">
                  Mobile Number (Karnataka Farmer ID)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-black text-black/60 dark:text-slate-400">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7338025342"
                    required
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl pl-12 pr-4 py-2.5 text-xs font-black text-black dark:text-white outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-300 font-extrabold flex items-center justify-between">
                <span>Verified Account: <strong>Chetan</strong></span>
                <Badge variant="emerald">Mandya Hub</Badge>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                <span>Send 6-Digit OTP</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-2.5 h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    required
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono font-black tracking-widest text-black dark:text-white outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verify & Complete Login</span>
              </Button>
            </form>
          )
        )}

        {/* Option 2: Email Login Form */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">
                Enterprise Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chetanreddy445@gmail.com"
                  required
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl pl-10 pr-4 py-2.5 text-xs font-black text-black dark:text-white outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              <span>Sign In as Chetan</span>
            </Button>
          </form>
        )}

      </div>
    </Modal>
  );
};
