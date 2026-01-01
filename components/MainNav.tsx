'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HowToPlayModal from './HowToPlayModal';
import { RiskLevel } from '@/types';

interface HistoryItem {
  id: number;
  multiplier: number;
  risk: RiskLevel;
}

interface MainNavProps {
  balance: number;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  history: HistoryItem[];
  onShowExtendedHistory: () => void;
}

export default function MainNav({ balance, soundEnabled, onSoundToggle, history, onShowExtendedHistory }: MainNavProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm z-50">
        <div className="container mx-auto px-2 py-1">
          <div className="flex items-center justify-between">
            {/* Left Section: Logo + History */}
            <div className="flex items-center gap-2">
              {/* Logo/Brand */}
              <div className="text-white shadow-lg font-bold">
                PLINKO
              </div>

              {/* History Button and Items */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onShowExtendedHistory}
                  className="w-7 h-7 rounded-full bg-gradient-to-b from-green-500 via-green-600 to-gray-800 border-b-4 border-gray-900 shadow-xl shadow-gray-900/80 hover:from-gray-400 hover:via-gray-500 hover:to-gray-700 hover:shadow-gray-900/90 hover:border-gray-800 active:shadow-inner active:shadow-gray-900/60 active:border-gray-900 active:scale-95 transition-all duration-75 text-white flex items-center justify-center flex-shrink-0"
                  title="View extended history"
                >
                  <i className="fas fa-history text-[10px]"></i>
                </button>
                <div className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth max-w-[200px]">
                  {history.length > 0 ? history.slice(0, 4).map((item, index) => {
                    // Determine color based on risk level and multiplier
                    let bgColor = '';
                    const isDark = item.multiplier < 1;

                    if (item.risk === 'GREEN') {
                      bgColor = isDark ? 'bg-[rgb(100,140,45)]' : 'bg-[rgb(140,185,60)]';
                    } else if (item.risk === 'YELLOW') {
                      bgColor = isDark ? 'bg-[rgb(20,100,200)]' : 'bg-[rgb(30,144,255)]';
                    } else if (item.risk === 'RED') {
                      bgColor = isDark ? 'bg-[rgb(160,35,35)]' : 'bg-[rgb(210,50,50)]';
                    }

                    return (
                      <div
                        key={item.id}
                        className={`${index === 0 ? 'history-item-enter' : ''} ${bgColor} px-1.5 py-0.5 text-[10px] font-black min-w-fit text-white transition-all duration-300`}
                      >
                        {item.multiplier}x
                      </div>
                    );
                  }) : (
                    <div className="text-[9px] text-white/60 font-bold uppercase tracking-wide px-1 italic">Waiting...</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section: Balance + Hamburger */}
            <div className="flex items-center gap-2">
              {/* Balance */}
              <div className="flex items-center gap-0 px-2 py-1">
                <span className="text-white font-black text-[13px] px-2 py-0.5 tracking-tight">
                  {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-white/80 text-[13px] font-black px-1.5 py-0.5">USD</span>
              </div>

              {/* Hamburger Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] transition-all active:scale-95"
                >
                  <div className="w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
                  <div className="w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
                  <div className="w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute right-0 top-12 w-48 bg-black/15 backdrop-blur-md rounded-lg shadow-[0_8px_0_0_rgba(34,197,94,0.4)] border border-white/10 z-50">
                      {/* Title */}
                      <div className="px-3 py-2 border-b border-white/10">
                        <span className="text-white/30 font-bold text-sm">PLINKO</span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                          Home
                        </button>
                        <button
                          onClick={() => {
                            setHowToPlayOpen(true);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                          How to Play
                        </button>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => {
                            setSettingsOpen(true);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                        >
                          Settings
                        </button>

                        {/* Sound Toggle */}
                        <div className="px-3 py-2 border-t border-white/10 mt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70 text-xs font-medium">Sound</span>
                            <button
                              onClick={onSoundToggle}
                              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                                soundEnabled
                                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                                  : 'bg-gradient-to-r from-gray-600 to-gray-700'
                              } shadow-lg`}
                            >
                              <div
                                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                                  soundEnabled ? 'left-[22px]' : 'left-0.5'
                                }`}
                              >
                                <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-[7px] ${soundEnabled ? 'text-green-600' : 'text-gray-600'}`}></i>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Dialog with Tabs */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Settings</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger
                value="visual"
                className="data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold"
              >
                Visual
              </TabsTrigger>
              <TabsTrigger
                value="autodrop"
                className="data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold"
              >
                Auto-drop
              </TabsTrigger>
              <TabsTrigger
                value="agreement"
                className="data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold"
              >
                Agreement
              </TabsTrigger>
            </TabsList>


            {/* Visual Settings Tab - Placeholder */}
            <TabsContent value="visual" className="space-y-4 py-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Visual Settings</h3>
                <p className="text-sm text-gray-600">Visual settings coming soon...</p>
              </div>
            </TabsContent>

            {/* Auto-drop Settings Tab - Placeholder */}
            <TabsContent value="autodrop" className="space-y-4 py-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Auto-drop Settings</h3>
                <p className="text-sm text-gray-600">Auto-drop settings coming soon...</p>
              </div>
            </TabsContent>

            {/* User Agreement Tab - Placeholder */}
            <TabsContent value="agreement" className="space-y-4 py-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">User Agreement</h3>
                <p className="text-sm text-gray-600">User agreement coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* How to Play Modal */}
      <HowToPlayModal open={howToPlayOpen} onOpenChange={setHowToPlayOpen} />
    </>
  );
}
