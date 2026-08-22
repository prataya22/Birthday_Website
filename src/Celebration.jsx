import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./Celebration.css";

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */
function Sticker({ children, className = "", label }) {
  return (
    <span className={`cel-sticker ${className}`} role="img" aria-label={label}>
      {children}
    </span>
  );
}

function CandleSet({ blowing, blown, smokeActive }) {
  const candles = [
    { cls: "candle-1", color: "pink" },
    { cls: "candle-2", color: "yellow" },
    { cls: "candle-3", color: "green" },
  ];

  const flameClass = blowing ? "flame blowing" : blown ? "flame blown" : "flame";

  return (
    <div className="candle-group" style={{ position: "relative" }}>
      {/* Wind swoosh — sits to the left, sweeps through all 3 candles */}
      <div className={`wind-swoosh${blowing ? " active" : ""}`} aria-hidden="true">
        <div className="wind-line" />
        <div className="wind-line" />
        <div className="wind-line" />
      </div>

      {candles.map(({ cls, color }) => (
        <div key={cls} className={`candle-wrap ${cls}`}>
          <div className={flameClass} />
          {/* Smoke wisps appear after flame is out */}
          <div className={`smoke-wrap${smokeActive ? " active" : ""}`}>
            <div className="smoke-wisp" />
            <div className="smoke-wisp" />
            <div className="smoke-wisp" />
          </div>
          <div className="candle-body" />
          <div className={`candle-drip ${color}`} />
        </div>
      ))}
    </div>
  );
}

function Cake({ blowing, blown, smokeActive, sliceCut }) {
  return (
    <div className="cake-scene">
      <div className={`cake${sliceCut ? " sliced" : ""}`}>
        <CandleSet blowing={blowing} blown={blown} smokeActive={smokeActive} />
        <div className="cake-tier tier-top">
          <div className="frosting">
            {[...Array(6)].map((_, i) => <div key={i} className="drip" />)}
          </div>
          <div className="cake-deco">
            {["pink", "yellow", "green", "pink", "yellow"].map((c, i) => (
              <div key={i} className={`cake-dot ${c}`} />
            ))}
          </div>
          {/* Missing wedge overlay */}
          {sliceCut && <div className="wedge-cut wedge-top" />}
        </div>

        {/* Mid tier */}
        <div className="cake-tier tier-mid">
          <div className="frosting">
            {[...Array(8)].map((_, i) => <div key={i} className="drip" />)}
          </div>
          <div className="cake-deco">
            {["yellow", "green", "pink", "yellow", "green", "pink", "yellow"].map((c, i) => (
              <div key={i} className={`cake-dot ${c}`} />
            ))}
          </div>
        </div>

        {/* Bottom tier */}
        <div className="cake-tier tier-bot">
          <div className="frosting">
            {[...Array(10)].map((_, i) => <div key={i} className="drip" />)}
          </div>
          <div className="cake-deco">
            {["pink", "green", "yellow", "pink", "green", "yellow", "pink", "green", "yellow"].map((c, i) => (
              <div key={i} className={`cake-dot ${c}`} />
            ))}
          </div>
        </div>

        <div className="cake-plate" />
        <div className={`cake-glow${blown ? " dim" : ""}`} />
      </div>

      {/* Animated slice that separates out */}
      <div className={`slice-area${sliceCut ? " active" : ""}`}>
        <div className="slice-emoji">🍰</div>
        <div className="slice-plate" />
        <p className="slice-label">Your piece!</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
   Main Component
---------------------------------------------------------- */
export default function Celebration({ onBack, onSurprises }) {
  const [blowing, setBlowing] = useState(false);
  const [blown, setBlown] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sliceCut, setSliceCut] = useState(false);
  const hasConfetti = useRef(false);
  const audioRef = useRef(null);

  /* ---- Synthesized party fanfare using Web Audio API ---- */
  const playFanfare = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      const playNote = (freq, startTime, duration, volume = 0.18, type = "sine") => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      };

      const now = ctx.currentTime;

      // Opening pop/crack — party popper sound
      const noise = ctx.createOscillator();
      const noiseGain = ctx.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.type = "sawtooth";
      noise.frequency.setValueAtTime(800, now);
      noise.frequency.exponentialRampToValueAtTime(200, now + 0.12);
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.start(now);
      noise.stop(now + 0.15);

      // Ascending fanfare melody — joyful & bright
      const melody = [
        [523.25, 0.0, 0.22], // C5
        [659.25, 0.18, 0.22], // E5
        [783.99, 0.35, 0.22], // G5
        [1046.5, 0.50, 0.40], // C6 (hold)
        [783.99, 0.70, 0.18], // G5
        [1046.5, 0.85, 0.55], // C6 (final hold)
      ];

      melody.forEach(([freq, offset, dur]) => {
        playNote(freq, now + offset, dur, 0.14, "triangle");
        // Add a soft harmonic
        playNote(freq * 2, now + offset, dur * 0.7, 0.04, "sine");
      });

      // Sparkle shimmer — high-freq twinkling
      const shimmer = [1318.5, 1567.98, 2093.0, 1567.98, 1318.5];
      shimmer.forEach((freq, i) => {
        playNote(freq, now + 0.5 + i * 0.09, 0.12, 0.06, "sine");
      });

      // Deep celebratory boom underneath
      playNote(130.81, now + 0.1, 0.6, 0.18, "sine"); // C3
      playNote(196.0, now + 0.3, 0.4, 0.12, "sine"); // G3

      // Second burst pop (sync with 900ms confetti burst)
      setTimeout(() => {
        try {
          const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
          const n2 = ctx2.currentTime;
          const pop = ctx2.createOscillator();
          const popGain = ctx2.createGain();
          pop.connect(popGain);
          popGain.connect(ctx2.destination);
          pop.type = "sawtooth";
          pop.frequency.setValueAtTime(1000, n2);
          pop.frequency.exponentialRampToValueAtTime(250, n2 + 0.1);
          popGain.gain.setValueAtTime(0.18, n2);
          popGain.gain.exponentialRampToValueAtTime(0.001, n2 + 0.1);
          pop.start(n2);
          pop.stop(n2 + 0.15);
          // Chime
          [880, 1108.73, 1318.5].forEach((f, i) => {
            const o = ctx2.createOscillator();
            const g = ctx2.createGain();
            o.connect(g); g.connect(ctx2.destination);
            o.type = "sine";
            o.frequency.setValueAtTime(f, n2 + i * 0.07);
            g.gain.setValueAtTime(0.10, n2 + i * 0.07);
            g.gain.exponentialRampToValueAtTime(0.001, n2 + i * 0.07 + 0.35);
            o.start(n2 + i * 0.07);
            o.stop(n2 + i * 0.07 + 0.4);
          });
        } catch (_) { }
      }, 500);

    } catch (e) {
      console.log("Web Audio not supported:", e);
    }
  };

  /* Fire confetti + fanfare on mount */
  useEffect(() => {
    if (hasConfetti.current) return;
    hasConfetti.current = true;

    // Play fanfare on first user-gesture-initiated mount (celebration page opened by click)
    playFanfare();

    const colors = ["#d93470", "#ffd35c", "#afd0c6", "#252641", "#ffffff"];

    const burst = (origin, angle) =>
      confetti({
        particleCount: 80,
        spread: 70,
        angle,
        origin,
        colors,
        startVelocity: 45,
        gravity: 0.8,
        ticks: 200,
        shapes: ["circle", "square"],
      });

    setTimeout(() => {
      burst({ x: 0, y: 0.6 }, 60);
      burst({ x: 1, y: 0.6 }, 120);
    }, 400);

    setTimeout(() => {
      burst({ x: 0.2, y: 0.4 }, 75);
      burst({ x: 0.8, y: 0.4 }, 105);
    }, 900);

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors,
        startVelocity: 30,
        gravity: 0.6,
        ticks: 280,
        scalar: 1.2,
      });
    }, 1500);
  }, []);

  /* Blow candle — sequenced: wind → flame bends → flame out → smoke → dark */
  const blowCandle = () => {
    if (blown || blowing) return;

    // Play audio on click — stops naturally when the 21s file ends
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }

    // 1. Wind swoosh starts
    setBlowing(true);

    // 2. After wind hits (~350 ms), snap flame out
    setTimeout(() => {
      setBlown(true);
      setBlowing(false);
    }, 350);

    // 3. Smoke starts rising right after
    setTimeout(() => setSmokeActive(true), 400);

    // 4. Room goes dark after smoke is visible
    setTimeout(() => setDarkMode(true), 900);
  };

  /* Cut a slice */
  const cutSlice = () => {
    if (sliceCut) return;
    setSliceCut(true);

    setTimeout(() => {
      // celebratory confetti on cut
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.5, y: 0.55 },
        colors: ["#d93470", "#ffd35c", "#afd0c6", "#ffffff"],
        startVelocity: 20,
        gravity: 0.9,
        ticks: 150,
        shapes: ["circle"],
      });
    }, 600); // Sync with knife cut
  };

  return (
    <div className={`celebration-page${darkMode ? " dark-mode" : ""}`}>
      {/* Dark vignette overlay */}
      <div className="dark-vignette" />

      {/* Streamers */}
      <div className="streamers" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`streamer streamer-${i + 1}`} style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>

      {/* Floating stickers */}
      <div className="cel-stickers" aria-hidden="true">
        <Sticker className="cel-sticker-s1" label="balloons">🎈</Sticker>
        <Sticker className="cel-sticker-s2" label="party popper">🎉</Sticker>
        <Sticker className="cel-sticker-s3" label="star">⭐</Sticker>
        <Sticker className="cel-sticker-s4" label="sparkle">✨</Sticker>
        <Sticker className="cel-sticker-s5" label="flower">🌸</Sticker>
        <Sticker className="cel-sticker-s6" label="gift">🎁</Sticker>
        <Sticker className="cel-sticker-s7" label="ribbon">🎀</Sticker>
        <Sticker className="cel-sticker-s8" label="champagne">🥂</Sticker>
      </div>

      {/* Main content */}
      <div className="cel-content">
        {onBack && (
          <button
            className="surp-back"
            onClick={onBack}
            type="button"
            style={{ alignSelf: "flex-start", marginBottom: "16px" }}
          >
            ← Back
          </button>
        )}

        {/* Heading */}
        <div className="cel-heading">
          <p className="cel-intro">It's time to celebrate 🎊</p>
          <h1>
            HAPPY <em>BIRTH</em>DAY
          </h1>
          <p className="cel-sub">· A whole new chapter ahead ·</p>
        </div>

        {/* Cake */}
        <div className="cake-wrapper">
          <Cake blowing={blowing} blown={blown} smokeActive={smokeActive} sliceCut={sliceCut} />

          {/* Persistent audio player for background music */}
          <audio
            ref={audioRef}
            controls
            className="birthday-audio"
            src="/audio/WhatsApp Audio 2026-08-22 at 17.15.55.mpeg"
            preload="auto"
            style={{
              display: blown ? "block" : "none",
              marginTop: "20px"
            }}
          />

          {!blown ? (
            <button
              className="blow-btn"
              onClick={blowCandle}
              type="button"
              aria-label="Blow out the candles"
            >
              🌬️ &nbsp;Blow the candle
            </button>
          ) : !sliceCut ? (
            <button
              className="blow-btn blown-state"
              onClick={cutSlice}
              type="button"
            >
              🍰 &nbsp;Cut a piece
            </button>
          ) : (
            <div className="enjoy-wrapper">
              <p className="enjoy-msg">Enjoy your slice! 🎉</p>
              <button className="surprise-btn" type="button" onClick={onSurprises}>✨ &nbsp;Unlock more surprises</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
