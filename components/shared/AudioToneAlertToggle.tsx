"use client";

import * as React from "react";
import { Volume2, VolumeX, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AudioToneAlertToggle() {
  const [isAudible, setIsAudible] = React.useState(false);
  const [isPlayingTest, setIsPlayingTest] = React.useState(false);

  const playToneSound = () => {
    if (typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);

      setIsPlayingTest(true);
      setTimeout(() => setIsPlayingTest(false), 500);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant={isAudible ? "destructive" : "outline"}
        size="sm"
        onClick={() => {
          setIsAudible(!isAudible);
          if (!isAudible) playToneSound();
        }}
        className="font-mono text-[11px] gap-1.5 h-8"
        title="Toggle EOC Dispatch Annunciator Sirens"
      >
        {isAudible ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">ALARM ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">ALARM MUTED</span>
          </>
        )}
      </Button>

      {isAudible && (
        <Button
          variant="outline"
          size="icon-sm"
          onClick={playToneSound}
          title="Test Alert Tone"
          className="h-8 w-8 text-red-400 hover:text-white"
        >
          <BellRing className={`w-3.5 h-3.5 ${isPlayingTest ? "animate-bounce text-red-400" : ""}`} />
        </Button>
      )}
    </div>
  );
}
