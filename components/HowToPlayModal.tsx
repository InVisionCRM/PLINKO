'use client'

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HowToPlayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HowToPlayModal({ open, onOpenChange }: HowToPlayModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black max-h-[85vh] overflow-y-auto border-4 border-[#1BE7FF] shadow-2xl shadow-[#1BE7FF]/40"
        style={{
          boxShadow: '0 0 30px rgba(27, 231, 255, 0.5), inset 0 0 20px rgba(27, 231, 255, 0.1)'
        }}>
        <DialogHeader className="pb-2">
          <DialogTitle className="text-4xl font-black text-center tracking-wider"
            style={{
              fontFamily: 'Impact, "Arial Black", sans-serif',
              background: 'linear-gradient(135deg, #6FF4FF 0%, #1BE7FF 50%, #0BA5C4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(27, 231, 255, 0.3)'
            }}>
            HOW TO PLAY
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 px-1">
          {/* Game Rules - Compact */}
          <div className="bg-gradient-to-br from-[#1BE7FF]/10 to-transparent rounded-lg p-3 border-l-4 border-[#1BE7FF]">
            <h3 className="text-sm font-bold text-[#1BE7FF] mb-2 uppercase tracking-wide">Quick Start</h3>
            <div className="space-y-1.5 text-sm text-gray-300">
              <p><span className="text-white font-semibold">1.</span> Set your bet amount (min $0.10)</p>
              <p><span className="text-white font-semibold">2.</span> Choose your risk level:</p>
              <div className="flex gap-2 pl-4 py-1">
                <div className="flex-1 bg-black/50 rounded px-2 py-1 border border-[#AFFC41]/40">
                  <span className="font-bold" style={{ color: '#AFFC41' }}>GREEN</span>
                  <span className="text-xs block text-gray-400">Safe</span>
                </div>
                <div className="flex-1 bg-black/50 rounded px-2 py-1 border border-[#4392F1]/40">
                  <span className="font-bold" style={{ color: '#4392F1' }}>BLUE</span>
                  <span className="text-xs block text-gray-400">Balanced</span>
                </div>
                <div className="flex-1 bg-black/50 rounded px-2 py-1 border border-[#FF331F]/40">
                  <span className="font-bold" style={{ color: '#FF331F' }}>RED</span>
                  <span className="text-xs block text-gray-400">Risky</span>
                </div>
              </div>
              <p><span className="text-white font-semibold">3.</span> Click a color button to drop the ball</p>
              <p><span className="text-white font-semibold">4.</span> Win = Multiplier × Your Bet</p>
            </div>
          </div>

          {/* Features Grid - Compact */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/60 rounded-lg p-2 border border-[#1BE7FF]/30 hover:border-[#1BE7FF] transition-all">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-sync-alt text-[#1BE7FF] text-xs"></i>
                <h4 className="font-bold text-[#1BE7FF] text-sm">Auto-Drop</h4>
              </div>
              <p className="text-xs text-gray-400">Automatic ball drops with custom settings</p>
            </div>
            <div className="bg-black/60 rounded-lg p-2 border border-[#1BE7FF]/30 hover:border-[#1BE7FF] transition-all">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-history text-[#1BE7FF] text-xs"></i>
                <h4 className="font-bold text-[#1BE7FF] text-sm">History</h4>
              </div>
              <p className="text-xs text-gray-400">Track your recent multipliers</p>
            </div>
            <div className="bg-black/60 rounded-lg p-2 border border-[#1BE7FF]/30 hover:border-[#1BE7FF] transition-all">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-volume-up text-[#1BE7FF] text-xs"></i>
                <h4 className="font-bold text-[#1BE7FF] text-sm">Sound FX</h4>
              </div>
              <p className="text-xs text-gray-400">Toggle sound effects on/off</p>
            </div>
            <div className="bg-black/60 rounded-lg p-2 border border-[#1BE7FF]/30 hover:border-[#1BE7FF] transition-all">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-layer-group text-[#1BE7FF] text-xs"></i>
                <h4 className="font-bold text-[#1BE7FF] text-sm">Presets</h4>
              </div>
              <p className="text-xs text-gray-400">Quick bet amount selection</p>
            </div>
          </div>

          {/* Pro Tips - Compact */}
          <div className="bg-gradient-to-br from-[#AFFC41]/10 to-transparent rounded-lg p-3 border-l-4 border-[#AFFC41]">
            <h3 className="text-sm font-bold text-[#AFFC41] mb-2 uppercase tracking-wide">Pro Tips</h3>
            <ul className="space-y-1 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#1BE7FF] mt-0.5">▸</span>
                <span>Edge buckets = higher multipliers but harder to hit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1BE7FF] mt-0.5">▸</span>
                <span>Start with lower bets to learn the mechanics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1BE7FF] mt-0.5">▸</span>
                <span>Use Auto-Drop for hands-free gameplay</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1BE7FF] mt-0.5">▸</span>
                <span>Watch your balance and play responsibly</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-2 pb-1">
            <div className="inline-block bg-gradient-to-r from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] rounded-full px-6 py-2">
              <p className="text-base font-black text-black tracking-wide">
                READY TO PLAY? 🎯
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
