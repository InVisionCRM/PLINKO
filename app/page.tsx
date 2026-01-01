'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react';
import PlinkoGame from '../components/PlinkoGame';
import MainNav from '../components/MainNav';
import AutoPlayModal from '../components/AutoPlayModal';
import PresetAmountsModal from '../components/PresetAmountsModal';
import ExtendedHistoryModal from '../components/ExtendedHistoryModal';
import CustomAmountModal from '../components/CustomAmountModal';
import { GameState, RiskLevel } from '../types';
import { COLORS } from '../constants';

interface IntroScreenProps {
  onComplete: () => void;
}

function IntroScreen({ onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const duration = 5000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(Math.min(newProgress, 100));

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(onComplete, 200); // Small delay after completion
      }
    }, interval);

    // Start video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video failed to play, continue with progress bar only
      });
    }

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/ui/intro.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between h-full py-12">
        {/* Empty top space */}
        <div></div>

        {/* Progress Bar at Bottom */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-4">
            <span className="text-white text-lg font-semibold">
              Loading... {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}

interface AutoPlaySettings {
  riskLevel: RiskLevel;
  numberOfRounds: number;
  stopOnLossEnabled: boolean;
  stopOnLossAmount: number;
  stopOnBigWinEnabled: boolean;
  stopOnBigWinAmount: number;
  stopOnProfitEnabled: boolean;
  stopOnProfitAmount: number;
  onLossStrategy: 'reset' | 'increase' | 'decrease';
  onLossPercent: number;
  onWinStrategy: 'reset' | 'increase' | 'decrease';
  onWinPercent: number;
}

interface HistoryItem {
  id: number;
  multiplier: number;
  risk: RiskLevel;
}

const Home: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: 755.37,
    ballCount: 0
  });

  // Initialize wager from localStorage or default to $1
  const [wager, setWager] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('plinko-wager');
      return saved ? parseFloat(saved) : 1.00;
    }
    return 1.00;
  });
  const [lastDrop, setLastDrop] = useState<{ id: number; risk: RiskLevel } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAutoDrop, setIsAutoDrop] = useState(false);
  const [showAutoPlayModal, setShowAutoPlayModal] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [showExtendedHistory, setShowExtendedHistory] = useState(false);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [autoPlaySettings, setAutoPlaySettings] = useState<AutoPlaySettings | null>(null);
  const [remainingBalls, setRemainingBalls] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [winLossBadge, setWinLossBadge] = useState<{ amount: number; key: number } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const lastRiskRef = useRef<RiskLevel>('GREEN');
  const historyIdCounter = useRef(0);

  // AutoPlay state tracking
  const initialWagerRef = useRef(0.30);
  const startingBalanceRef = useRef(755.37);
  const lastWinAmountRef = useRef(0);
  const currentWagerRef = useRef(1.00); // Track current wager for auto-play calculations
  const isAutoDropRef = useRef(false); // Track auto-drop status synchronously
  const autoPlaySettingsRef = useRef<AutoPlaySettings | null>(null); // Track settings synchronously

  // Keep currentWagerRef in sync with wager state
  useEffect(() => {
    currentWagerRef.current = wager;
  }, [wager]);


  const handleScore = useCallback((multiplier: number) => {
    const winAmount = wager * multiplier;
    const profit = winAmount - wager;
    lastWinAmountRef.current = winAmount;

    console.log('=== SCORE EVENT ===');
    console.log('Multiplier:', multiplier);
    console.log('Current Wager:', wager);
    console.log('Is Auto Drop:', isAutoDrop);
    console.log('Auto Play Settings:', autoPlaySettings);
    console.log('Remaining Balls:', remainingBalls);
    console.log('Game Balance:', gameState.balance);

    setGameState(prev => {
      const newBalance = prev.balance + winAmount;

      // Check AutoPlay stop conditions
      console.log('Auto-drop check:', isAutoDropRef.current, '&&', !!autoPlaySettingsRef.current, '=', isAutoDropRef.current && autoPlaySettingsRef.current);
      if (isAutoDropRef.current && autoPlaySettingsRef.current) {
        // Stop if cash decreases by
      if (autoPlaySettingsRef.current!.stopOnLossEnabled) {
        const totalLoss = startingBalanceRef.current - newBalance;
        if (totalLoss >= autoPlaySettingsRef.current!.stopOnLossAmount) {
          console.log('=== AUTO-DROP DISABLED: Loss condition met ===');
          isAutoDropRef.current = false;
          autoPlaySettingsRef.current = null;
          setAutoPlaySettings(null);
          setIsAutoDrop(false);
          setRemainingBalls(0);
        }
      }

        // Stop if single win exceeds
        if (autoPlaySettingsRef.current!.stopOnBigWinEnabled && winAmount >= autoPlaySettingsRef.current!.stopOnBigWinAmount) {
          console.log('=== AUTO-DROP DISABLED: Big win condition met ===');
          isAutoDropRef.current = false;
          autoPlaySettingsRef.current = null;
          setAutoPlaySettings(null);
          setIsAutoDrop(false);
          setRemainingBalls(0);
        }

        // Stop if cash increases by
        if (autoPlaySettingsRef.current!.stopOnProfitEnabled) {
          const totalProfit = newBalance - startingBalanceRef.current;
          if (totalProfit >= autoPlaySettingsRef.current!.stopOnProfitAmount) {
            console.log('=== AUTO-DROP DISABLED: Profit condition met ===');
            isAutoDropRef.current = false;
            autoPlaySettingsRef.current = null;
            setAutoPlaySettings(null);
            setIsAutoDrop(false);
            setRemainingBalls(0);
          }
        }

        // Apply bet progression strategy
        const isWin = multiplier > 1;
        const strategy = isWin ? autoPlaySettingsRef.current!.onWinStrategy : autoPlaySettingsRef.current!.onLossStrategy;
        const percent = isWin ? autoPlaySettingsRef.current!.onWinPercent : autoPlaySettingsRef.current!.onLossPercent;

        console.log('Win/Loss:', isWin ? 'WIN' : 'LOSS');
        console.log('Strategy:', strategy);
        console.log('Percent:', percent);
        console.log('*** APPLYING WAGER STRATEGY ***');
        console.log('currentWagerRef.current:', currentWagerRef.current);
        console.log('wager state:', wager);

        // Use currentWagerRef to get the most up-to-date wager value
        let currentWager = currentWagerRef.current || wager;
        console.log('Using currentWager:', currentWager);
        let newWager = currentWager;

        if (strategy === 'reset') {
          newWager = initialWagerRef.current;
          console.log('Resetting bet to initial:', newWager);
        } else if (strategy === 'increase') {
          newWager = +(currentWager * (1 + percent / 100)).toFixed(2);
          console.log('Increasing bet from', currentWager, 'to', newWager);
        } else if (strategy === 'decrease') {
          newWager = Math.max(0.1, +(currentWager * (1 - percent / 100)).toFixed(2));
          console.log('Decreasing bet from', currentWager, 'to', newWager);
        }

        // Update wager immediately
        if (newWager !== currentWager) {
          console.log('*** UPDATING WAGER FROM', currentWager, 'TO', newWager, '***');
          setWagerWithPersistence(newWager);
        }
      }

      return {
        ...prev,
        balance: newBalance
      };
    });

    // Generate unique ID using counter to prevent duplicate keys
    historyIdCounter.current += 1;
    const uniqueId = Date.now() * 1000 + historyIdCounter.current;

    setHistory(prev => [
      { id: uniqueId, multiplier, risk: lastRiskRef.current },
      ...prev
    ].slice(0, 15));

    // Show win/loss badge
    setWinLossBadge({ amount: profit, key: Date.now() });

    // Clear badge after animation completes
    setTimeout(() => {
      setWinLossBadge(null);
    }, 2000);
  }, [wager, isAutoDrop, autoPlaySettings]);

  const dropBall = useCallback((risk: RiskLevel) => {
    setGameState(prev => {
      if (prev.balance < wager) {
        isAutoDropRef.current = false;
        autoPlaySettingsRef.current = null;
        setAutoPlaySettings(null);
        setIsAutoDrop(false);
        return prev;
      }
      lastRiskRef.current = risk;
      setLastDrop({ id: Date.now(), risk });
      return {
        ...prev,
        balance: prev.balance - wager,
        ballCount: prev.ballCount + 1
      };
    });
  }, [wager]);

  // AutoPlay handler
  const handleStartAutoPlay = useCallback((settings: AutoPlaySettings) => {
    console.log('=== STARTING AUTO-PLAY ===');
    console.log('Settings:', settings);
    console.log('Initial Wager:', wager);
    console.log('Initial Balance:', gameState.balance);
    autoPlaySettingsRef.current = settings; // Set ref synchronously
    setAutoPlaySettings(settings);
    setRemainingBalls(settings.numberOfRounds);
    initialWagerRef.current = wager;
    startingBalanceRef.current = gameState.balance;
    isAutoDropRef.current = true; // Set ref synchronously
    setIsAutoDrop(true);
    console.log('Auto-drop enabled');
  }, [wager, gameState.balance]);

  // Auto Drop Logic
  useEffect(() => {
    let interval: number | null = null;
    if (isAutoDrop && remainingBalls > 0 && autoPlaySettings) {
      interval = window.setInterval(() => {
        dropBall(autoPlaySettings.riskLevel);
        setRemainingBalls(prev => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            console.log('=== AUTO-DROP DISABLED: All balls completed ===');
            isAutoDropRef.current = false;
            autoPlaySettingsRef.current = null;
            setAutoPlaySettings(null);
            setIsAutoDrop(false);
            setRemainingBalls(0);
          }
          return newCount;
        });
      }, 1000); // Fixed 1 second interval
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoDrop, dropBall, remainingBalls, autoPlaySettings]);

  // Detect mobile devices for responsive background
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 440); // Mobile breakpoint at 640px
    };

    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adjustWager = (amount: number) => {
    setWagerWithPersistence(prev => Math.max(0.1, +(prev + amount).toFixed(2)));
  };

  // Helper to set wager with localStorage persistence
  const setWagerWithPersistence = (newWager: number | ((prev: number) => number)) => {
    setWager(prev => {
      const newValue = typeof newWager === 'function' ? newWager(prev) : newWager;
      // Update ref synchronously for immediate access
      currentWagerRef.current = newValue;
      if (typeof window !== 'undefined') {
        localStorage.setItem('plinko-wager', newValue.toString());
      }
      return newValue;
    });
  };

  // Hold-to-repeat functionality for wager buttons
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAdjusting = (amount: number) => {
    adjustWager(amount); // Immediate adjustment

    // Wait 300ms before starting to repeat
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        adjustWager(amount);
      }, 50); // Repeat every 50ms
    }, 300);
  };

  const stopAdjusting = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAdjusting();
    };
  }, []);

  // Show intro screen first
  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div
      className="flex flex-col h-screen w-full transition-all duration-1000 overflow-hidden relative"
      style={{
        backgroundImage: 'url(/ui/pg1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Main Content */}
      <MainNav
        balance={gameState.balance}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
        history={history}
        onShowExtendedHistory={() => setShowExtendedHistory(true)}
      />

      {/* Win/Loss Badge */}
      <div className="fixed top-14 right-2 z-30">
        {winLossBadge && (
          <div
            key={winLossBadge.key}
            className={`win-loss-badge-enter px-2 py-1 rounded text-[10px] font-black ${
              winLossBadge.amount >= 0
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } shadow-md border border-black/20`}
          >
            {winLossBadge.amount >= 0 ? '+' : ''}{winLossBadge.amount.toFixed(2)}
          </div>
        )}
      </div>

      {/* PLINKO Title - Fixed position 100px from top */}
      <div className="fixed top-[100px] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-5xl lg:text-7xl font-black tracking-widest" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
          {['P', 'L', 'I', 'N', 'K', 'O'].map((letter, i) => (
            <span
              key={i}
              className="letter-bounce"
              style={{
                color: 'rgb(0, 247, 255)',
                textShadow: '0 3px 0 rgba(0, 0, 0, 0.9), 0 6px 0 rgba(0, 0, 0, 0.7), 0 9px 0 rgba(0, 0, 0, 0.5), 0 12px 20px rgba(0, 247, 255, 0.5), 0 0 30px rgba(0, 247, 255, 0.3)',
                animationDelay: `${i * 0.15}s`
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* MAIN CONTENT - Full height with proper spacing for fixed elements */}
      <main className="absolute inset-0 flex items-center justify-center pointer-events-auto" style={{ top: '130px', bottom: '220px' }}>
        {/* GAME BOARD */}
        <div className="w-full h-full flex justify-center items-center">
          <PlinkoGame
            onScore={handleScore}
            lastDrop={lastDrop}
            soundEnabled={soundEnabled}
            isAutoDrop={isAutoDrop}
          />
        </div>
      </main>

      {/* CONTROLS - Fixed 100px from bottom with 10px padding from game board */}
      <div className="fixed bottom-[100px] left-0 right-0 z-20">
        <div
          className="flex-shrink-0 bg-black/20 rounded-2xl mx-auto pt-[10px]"
          style={{
            backgroundColor: 'rgba(29, 246, 221, 0)'
          }}
        >
          {/* Desktop Layout - 2 Rows */}
          <div className="hidden sm:flex flex-col gap-2 p-2">
            {/* Row 1: Bet Amount + Control Buttons */}
            <div className="flex items-center justify-center gap-2">
              {/* Bet Amount Display */}
              <button
                onClick={() => setShowCustomAmountModal(true)}
                className="bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] rounded-full px-5 py-2 shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 min-w-[140px] hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <div className="text-center">
                  <div className="text-white/60 text-[9px] font-medium uppercase tracking-wide">Bet USD</div>
                  <div className="text-white font-bold text-lg font-poppins">{wager.toFixed(2)}</div>
                </div>
              </button>

              {/* Control Buttons Group */}
              <button
                onMouseDown={() => startAdjusting(-0.1)}
                onMouseUp={stopAdjusting}
                onMouseLeave={stopAdjusting}
                onTouchStart={() => startAdjusting(-0.1)}
                onTouchEnd={stopAdjusting}
                className="w-8 h-8 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                −
              </button>
              <button
                onClick={() => setShowPresetModal(true)}
                className="w-11 h-11 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75 flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <i className="fas fa-layer-group text-sm"></i>
              </button>
              <button
                onMouseDown={() => startAdjusting(0.1)}
                onMouseUp={stopAdjusting}
                onMouseLeave={stopAdjusting}
                onTouchStart={() => startAdjusting(0.1)}
                onTouchEnd={stopAdjusting}
                className="w-8 h-8 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                +
              </button>
            </div>

            {/* Row 2: Risk Level Buttons + Auto Play */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => dropBall('GREEN')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#AFFC41] via-[#AFFC41]/80 to-[#AFFC41]/60 text-black font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#AFFC41]/80 hover:from-[#AFFC41] hover:via-[#AFFC41]/90 hover:to-[#AFFC41]/70 hover:shadow-black/80 hover:border-[#AFFC41] active:shadow-inner active:shadow-black/40 active:border-[#AFFC41]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(175, 252, 65, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                GREEN
              </button>
              <button
                onClick={() => dropBall('YELLOW')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#4392F1] via-[#4392F1]/80 to-[#4392F1]/60 text-white font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#4392F1]/80 hover:from-[#4392F1] hover:via-[#4392F1]/90 hover:to-[#4392F1]/70 hover:shadow-black/80 hover:border-[#4392F1] active:shadow-inner active:shadow-black/40 active:border-[#4392F1]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(67, 146, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                BLUE
              </button>
              <button
                onClick={() => dropBall('RED')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#FF331F] via-[#FF331F]/80 to-[#FF331F]/60 text-white font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#FF331F]/80 hover:from-[#FF331F] hover:via-[#FF331F]/90 hover:to-[#FF331F]/70 hover:shadow-black/80 hover:border-[#FF331F] active:shadow-inner active:shadow-black/40 active:border-[#FF331F]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255, 51, 31, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                RED
              </button>

              {/* Auto Play Button */}
              <button
                onClick={() => {
                  if (isAutoDrop) {
                    isAutoDropRef.current = false;
                    autoPlaySettingsRef.current = null;
                    setAutoPlaySettings(null);
                    setIsAutoDrop(false);
                    setRemainingBalls(0);
                  } else {
                    setShowAutoPlayModal(true);
                  }
                }}
                className={`w-12 h-12 rounded-full shadow-xl border-b-4 active:scale-95 transition-all duration-75 flex items-center justify-center ${
                  isAutoDrop
                    ? 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-yellow-900/90 hover:border-yellow-700 active:shadow-inner active:shadow-yellow-900/60 active:border-yellow-900'
                    : 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900'
                }`}
              >
                {isAutoDrop ? (
                  <span className="font-bold text-sm">{remainingBalls}</span>
                ) : (
                  <i className="fas fa-sync-alt text-lg"></i>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Layout - 2 Rows */}
          <div className="sm:hidden flex flex-col gap-2 p-1">
            {/* Row 1: Bet Display + Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowCustomAmountModal(true)}
                className="bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] rounded-full px-5 py-2 shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 min-w-[120px] hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <div className="text-center">
                  <div className="text-white/60 text-[9px] font-medium uppercase tracking-wide">Bet USD</div>
                  <div className="text-white font-bold text-lg font-poppins">{wager.toFixed(2)}</div>
                </div>
              </button>

              <button
                onMouseDown={() => startAdjusting(-0.1)}
                onMouseUp={stopAdjusting}
                onMouseLeave={stopAdjusting}
                onTouchStart={() => startAdjusting(-0.1)}
                onTouchEnd={stopAdjusting}
                className="w-8 h-8 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                −
              </button>
              <button
                onClick={() => setShowPresetModal(true)}
                className="w-11 h-11 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75 flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <i className="fas fa-layer-group text-sm"></i>
              </button>
              <button
                onMouseDown={() => startAdjusting(0.1)}
                onMouseUp={stopAdjusting}
                onMouseLeave={stopAdjusting}
                onTouchStart={() => startAdjusting(0.1)}
                onTouchEnd={stopAdjusting}
                className="w-8 h-8 rounded-full bg-gradient-to-b from-[#6FF4FF] via-[#1BE7FF] to-[#0BA5C4] text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                +
              </button>
            </div>

            {/* Row 2: Risk Buttons + Auto Play */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => dropBall('GREEN')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#AFFC41] via-[#AFFC41]/80 to-[#AFFC41]/60 text-black font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#AFFC41]/80 hover:from-[#AFFC41] hover:via-[#AFFC41]/90 hover:to-[#AFFC41]/70 hover:shadow-black/80 hover:border-[#AFFC41] active:shadow-inner active:shadow-black/40 active:border-[#AFFC41]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(175, 252, 65, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                GREEN
              </button>
              <button
                onClick={() => dropBall('YELLOW')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#4392F1] via-[#4392F1]/80 to-[#4392F1]/60 text-white font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#4392F1]/80 hover:from-[#4392F1] hover:via-[#4392F1]/90 hover:to-[#4392F1]/70 hover:shadow-black/80 hover:border-[#4392F1] active:shadow-inner active:shadow-black/40 active:border-[#4392F1]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(67, 146, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                BLUE
              </button>
              <button
                onClick={() => dropBall('RED')}
                className="h-10 px-6 rounded-full bg-gradient-to-b from-[#FF331F] via-[#FF331F]/80 to-[#FF331F]/60 text-white font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#FF331F]/80 hover:from-[#FF331F] hover:via-[#FF331F]/90 hover:to-[#FF331F]/70 hover:shadow-black/80 hover:border-[#FF331F] active:shadow-inner active:shadow-black/40 active:border-[#FF331F]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255, 51, 31, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                RED
              </button>

              {/* Auto Play Button */}
              <button
                onClick={() => {
                  if (isAutoDrop) {
                    isAutoDropRef.current = false;
                    autoPlaySettingsRef.current = null;
                    setAutoPlaySettings(null);
                    setIsAutoDrop(false);
                    setRemainingBalls(0);
                  } else {
                    setShowAutoPlayModal(true);
                  }
                }}
                className={`w-10 h-10 rounded-full shadow-xl border-b-4 active:scale-95 transition-all duration-75 flex items-center justify-center ${
                  isAutoDrop
                    ? 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900'
                    : 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900'
                }`}
              >
                {isAutoDrop ? (
                  <span className="font-bold text-sm">{remainingBalls}</span>
                ) : (
                  <i className="fas fa-sync-alt text-lg"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AutoPlayModal
        open={showAutoPlayModal}
        onOpenChange={setShowAutoPlayModal}
        onStart={handleStartAutoPlay}
        currentBalance={gameState.balance}
      />

      <PresetAmountsModal
        open={showPresetModal}
        onOpenChange={setShowPresetModal}
        onSelectAmount={setWagerWithPersistence}
      />

      <ExtendedHistoryModal
        open={showExtendedHistory}
        onOpenChange={setShowExtendedHistory}
        history={history}
      />

      <CustomAmountModal
        open={showCustomAmountModal}
        onOpenChange={setShowCustomAmountModal}
        onSetAmount={setWagerWithPersistence}
        currentAmount={wager}
      />
    </div>
  );
};

export default Home;
