import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";
import img2006 from "./assets/photo_2006.jpeg";
import img2026 from "./assets/photo_2026.jpeg";
import img2012 from "./assets/photo_2012.jpeg";
import img2018 from "./assets/photo_2018.jpeg";
import img2022 from "./assets/photo_2022.jpeg";
import img2025 from "./assets/photo_2025.jpeg";

const MILESTONES = [
  {
    year: "2006",
    title: "The Beginning 👶🏻",
    subtitle: "Where the story of Prataya officially began.",
    image: img2006,
    tag: "Level 1",
    color: "pink",
    sticker: "🍼",
  },
  {
    year: "2012",
    title: "Tiny Human Era 🎒",
    subtitle: "School days, childhood memories, and the beginning of countless stories.",
    image: img2012,
    tag: "Childhood",
    color: "yellow",
    sticker: "🎨",
  },
  {
    year: "2018",
    title: "The Plot Thickens ✨",
    subtitle: "Growing up, making friends, discovering new interests, and collecting memories.",
    image: img2018,
    tag: "Teen Years",
    color: "green",
    sticker: "🌟",
  },
  {
    year: "2022",
    title: "Main Character Arc 🎨",
    subtitle: "New experiences, new dreams, and a little more independence.",
    image: img2022,
    tag: "Growth",
    color: "lavender",
    sticker: "💫",
  },
  {
    year: "2025",
    title: "New Chapter 💻",
    subtitle: "College, coding, projects, new people, and figuring things out along the way.",
    image: img2025,
    tag: "Tech & College",
    color: "peach",
    sticker: "🚀",
  },
  {
    year: "2026",
    title: "Level 20 Unlocked 🎂",
    subtitle: "Officially not a teenager anymore. A whole new chapter begins.",
    image: img2026,
    tag: "Level 20",
    color: "pink",
    sticker: "🎉",
  },
];

function Sticker({ children, className = "" }) {
  return (
    <span className={`tl-sticker ${className}`} role="img" aria-hidden="true">
      {children}
    </span>
  );
}

/* Polaroid Photo Reveal Modal */
function PhotoModal({ milestone, onClose }) {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <div className="tl-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="tl-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <button className="tl-modal-close" onClick={onClose} aria-label="Close memory">
            ✕
          </button>

          <div className="polaroid-frame">
            <div className="polaroid-tape" />
            <div className="polaroid-img-wrapper">
              {milestone.image ? (
                <img src={milestone.image} alt={milestone.title} className="polaroid-img" />
              ) : (
                <div className="polaroid-placeholder">
                  <span>📸</span>
                  <p>Add memory photo here</p>
                  <small>Import your photo in <code>Timeline.jsx</code> to show it here!</small>
                </div>
              )}
              <span className="polaroid-year-badge">{milestone.year}</span>
            </div>
            <div className="polaroid-caption">
              <h3>{milestone.title}</h3>
              <p className="polaroid-sub">{milestone.subtitle}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Timeline({ onBack, onSurprises }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <div className="timeline-page">
      {/* Background ambient stickers */}
      <div className="tl-decorations" aria-hidden="true">
        <Sticker className="tl-s1">✨</Sticker>
        <Sticker className="tl-s2">⭐</Sticker>
        <Sticker className="tl-s3">🌸</Sticker>
        <Sticker className="tl-s4">🎀</Sticker>
        <Sticker className="tl-s5">💫</Sticker>
        <Sticker className="tl-s6">💖</Sticker>
        <Sticker className="tl-s7">🎈</Sticker>
      </div>

      <div className="tl-container">
        {/* Back button */}
        {onBack && (
          <button className="surp-back" onClick={onBack} type="button">
            ← Back
          </button>
        )}

        {/* Page Header */}
        <motion.div
          className="tl-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="tl-eyebrow">A little journey through time ✨</p>
          <h1 className="tl-title">20 Years of Prataya</h1>
          <p className="tl-subtitle">
            Every year a milestone, every memory a story 📖
          </p>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="tl-timeline">
          {/* Glowing central line */}
          <div className="tl-central-line" />

          {MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.year}
                className={`tl-item ${isEven ? "tl-left" : "tl-right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Glowing milestone node on line */}
                <motion.div
                  className={`tl-dot tl-dot--${item.color}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <span className="tl-dot-inner" />
                </motion.div>

                {/* Milestone Card */}
                <motion.div
                  className={`tl-card tl-card--${item.color}`}
                  onClick={() => setSelectedMilestone(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedMilestone(item);
                    }
                  }}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-85px" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
                >
                  <div className="tl-card-header">
                    <span className="tl-year-pill">{item.year}</span>
                    <span className="tl-tag">{item.tag}</span>
                  </div>

                  <h2 className="tl-card-title">
                    {item.title}
                  </h2>

                  <p className="tl-card-desc">&ldquo;{item.subtitle}&rdquo;</p>

                  <div className="tl-card-footer">
                    <span className="tl-photo-hint">📸 Tap to view memory</span>
                    <span className="tl-sticker-badge">{item.sticker}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Finale Special Card */}
        <motion.div
          className="tl-finale-section"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="tl-finale-card">
            <div className="tl-finale-sparkle">✨ ❤️ ✨</div>
            <h2 className="tl-finale-title">AND THE STORY CONTINUES…</h2>
            <p className="tl-finale-quote">
              &ldquo;The best chapters haven&rsquo;t even been written yet.&rdquo; ❤️
            </p>
            <p className="tl-finale-subtext">
              Here&rsquo;s to all the magic, late nights, adventures, and endless laughter waiting for you ahead.
            </p>
          </div>

          {/* Navigation link to Surprises Page */}
          <motion.div
            className="tl-next-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <button
              className="celebrate-button tl-surprises-btn"
              onClick={onSurprises}
              type="button"
            >
              <strong>✦ </strong> UNLOCK 20 WISHES 🎁 <strong>✦</strong>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Photo Modal */}
      {selectedMilestone && (
        <PhotoModal
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}
    </div>
  );
}
