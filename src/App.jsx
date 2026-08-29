import { useState, useEffect } from "react";
import "./App.css";
import Celebration from "./Celebration";
import Surprises from "./Surprises";
import Timeline from "./Timeline";

function Sticker({ children, className = "", label }) {
  return (
    <span
      className={`sticker ${className}`}
      role="img"
      aria-label={label}
    >
      {children}
    </span>
  );
}

export default function App() {
  const [showCakePrompt, setShowCakePrompt] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showSkipConfirm2, setShowSkipConfirm2] = useState(false);
  const [showSkipTransition, setShowSkipTransition] = useState(false);

  // Synchronize active view with browser URL hash / history state
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === "#surprises") return "surprises";
    if (hash === "#timeline") return "timeline";
    if (hash === "#celebration") return "celebration";
    return "home";
  });

  useEffect(() => {
    const hash = window.location.hash;
    const initialView =
      hash === "#surprises"
        ? "surprises"
        : hash === "#timeline"
          ? "timeline"
          : hash === "#celebration"
            ? "celebration"
            : "home";
    if (!window.history.state) {
      window.history.replaceState({ view: initialView }, "", hash || "#");
    }

    const handleHashChange = () => {
      const h = window.location.hash;
      if (h === "#surprises") {
        setCurrentView("surprises");
      } else if (h === "#timeline") {
        setCurrentView("timeline");
      } else if (h === "#celebration") {
        setCurrentView("celebration");
      } else {
        setCurrentView("home");
      }
    };

    window.addEventListener("popstate", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    const targetHash = view === "home" ? "#" : `#${view}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({ view }, "", targetHash);
    }
  };

  const handleGoBack = (fallbackView = "home") => {
    if (window.history.length > 1 && window.history.state?.view) {
      window.history.back();
    } else {
      navigateTo(fallbackView);
    }
  };

  const goToCelebration = () => {
    setShowCakePrompt(false);
    navigateTo("celebration");
  };

  const skipCelebration = () => {
    setShowCakePrompt(false);
    setShowSkipConfirm(false);
    setShowSkipConfirm2(false);
  };

  if (currentView === "surprises") {
    return <Surprises onBack={() => handleGoBack("timeline")} />;
  }

  if (currentView === "timeline") {
    return (
      <Timeline
        onBack={() => handleGoBack("celebration")}
        onSurprises={() => navigateTo("surprises")}
      />
    );
  }

  if (currentView === "celebration") {
    return (
      <Celebration
        onBack={() => handleGoBack("home")}
        onSurprises={() => navigateTo("timeline")}
      />
    );
  }

  return (
    <main id="top" className="invitation-page">
      <section className="hero-section">
        <div className="hero-content">
          <Sticker
            className="sticker-sparkle"
            label="sparkle sticker"
          >
            ✨
          </Sticker>

          <Sticker
            className="sticker-bow"
            label="bow sticker"
          >
            🎀
          </Sticker>

          <Sticker
            className="sticker-star"
            label="star sticker"
          >
            ⭐
          </Sticker>

          <Sticker
            className="sticker-balloon"
            label="balloon sticker"
          >
            🎈
          </Sticker>

          <Sticker
            className="sticker-flower"
            label="flower sticker"
          >
            🌸
          </Sticker>

          <Sticker
            className="sticker-champagne"
            label="champagne sticker"
          >
            🥂
          </Sticker>

          <div className="hero-heading">

            <p className="intro-text">
              Cheers to another trip around the sun.
            </p>

            <h1>
              HELLO, <em>20.</em>
            </h1>

            <p className="birthday-text">
              Happy Birthday, Prataya. 🎂
            </p>

            {!showCakePrompt ? (
              <button
                className="celebrate-button"
                onClick={() => setShowCakePrompt(true)}
                type="button"
              >
                <strong>✦ </strong> LET’S CELEBRATE <strong>✦</strong>
              </button>
            ) : (
              <div
                className="cake-prompt-container"
                style={{ marginTop: "48px", animation: "riseIn 0.8s ease both" }}
              >
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                    color: "var(--pink)",
                    marginBottom: "24px",
                    fontStyle: "italic",
                    marginTop: 0
                  }}
                >
                  Wanna cut the cake?
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    className="celebrate-button"
                    style={{ marginTop: 0 }}
                    onClick={goToCelebration}
                    type="button"
                  >
                    <strong>✦ </strong> OF COURSE <strong>✦</strong>
                  </button>
                  <button
                    className="skip-it-btn"
                    onClick={() => setShowSkipConfirm(true)}
                    type="button"
                  >
                    I'LL SKIP IT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skip confirmation modal */}
      {showSkipConfirm && (
        <div
          className="skip-backdrop"
          onClick={() => setShowSkipConfirm(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="skip-modal" onClick={e => e.stopPropagation()}>
            <p className="skip-emoji">🥺</p>
            <h2 className="skip-title">Are you sure?</h2>
            <p className="skip-body">wait... you're really skipping the cake?</p>
            <div className="skip-actions">
              <button
                className="celebrate-button"
                style={{ marginTop: 0, fontSize: "10px" }}
                onClick={() => setShowSkipConfirm(false)}
                type="button"
              >
                ✦ TAKE ME BACK ✦
              </button>
              <button
                className="skip-confirm-btn"
                onClick={() => { setShowSkipConfirm(false); setShowSkipConfirm2(true); }}
                type="button"
              >
                Yes, skip it
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Second skip warning modal */}
      {showSkipConfirm2 && (
        <div
          className="skip-backdrop"
          onClick={() => setShowSkipConfirm2(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="skip-modal" onClick={e => e.stopPropagation()}>
            <p className="skip-emoji">😱</p>
            <h2 className="skip-title">Last chance!</h2>
            <p className="skip-body">you&rsquo;re gonna miss out on something <em>crazy</em>. trust me on this one.</p>
            <div className="skip-actions">
              <button
                className="celebrate-button"
                style={{ marginTop: 0, fontSize: "10px" }}
                onClick={() => { setShowSkipConfirm2(false); goToCelebration(); }}
                type="button"
              >
                ✦ OKAY FINE, LET&rsquo;S GO ✦
              </button>
              <button
                className="skip-confirm-btn"
                onClick={() => { setShowSkipConfirm2(false); setShowSkipTransition(true); }}
                type="button"
              >
                No really, skip it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skip → Surprises transition modal */}
      {showSkipTransition && (
        <div
          className="skip-backdrop"
          role="dialog"
          aria-modal="true"
        >
          <div className="skip-modal skip-transition-modal">
            <p className="skip-emoji">🎁</p>
            <h2 className="skip-title">Ok then!</h2>
            <p className="skip-body">
              Enjoy the next part — <em>it's all for you.</em> 💕
            </p>
            <button
              className="celebrate-button"
              style={{ marginTop: 0, fontSize: "11px", animation: "none" }}
              onClick={() => { setShowSkipTransition(false); navigateTo("timeline"); }}
              type="button"
            >
              ✦ Let's go ✦
            </button>
          </div>
        </div>
      )}
    </main>
  );
}