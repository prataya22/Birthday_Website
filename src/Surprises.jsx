import { useState } from "react";
import "./Surprises.css";

/* 20 letters — messages left empty for you to fill in */
const LETTERS = [
  { id: 1, from: "The Overthinking Department \uD83E\uDDE0", message: "May you stop overthinking things that haven\u2019t even happened yet.\nYour brain deserves a day off too." },
  { id: 2, from: "Sleep, Please. \uD83D\uDE2D", message: "May you finally understand that \u201cyou\u2019ll sleep early tonight\u201d is a lie you tell yourself every single night." },
  { id: 3, from: "Main Character Energy \u2728", message: "May you romanticize the little things more and worry about the big things a little less." },
  { id: 4, from: "Career Loading... \uD83D\uDCBB", message: "May you figure out what you want to do with your life.\nOr at least look like you know what you\u2019re doing." },
  { id: 5, from: "Money Money Money \uD83D\uDCB8", message: "May your bank balance grow faster than your list of things you want to buy." },
  { id: 6, from: "The Screenshot Problem \uD83D\uDCF1", message: "May you make more memories and fewer screenshots you\u2019ll never look at again." },
  { id: 7, from: "Confidence Era \uD83E\uDEA9", message: "May you stop questioning yourself every five minutes and start trusting yourself a little more." },
  { id: 8, from: "Procrastination Nation \uD83E\uDEE0", message: "May you stop saying \u201cyou\u2019ll do it tomorrow.\u201d\nTomorrow has suffered enough." },
  { id: 9, from: "Good People Only \uD83C\uDF37", message: "May you always have people around whom you can be completely yourself." },
  { id: 10, from: "Halfway There! \uD83C\uDF82", message: "Ten wishes down.\nCongratulations, you have successfully survived half the list." },
  { id: 11, from: "Plot Twists \uD83C\uDFA2", message: "May the unexpected things that happen this year turn out to be the stories you remember forever." },
  { id: 12, from: "Say No. \uD83D\uDEAA", message: "May you learn that saying \u201cno\u201d doesn\u2019t make you rude.\nIt just means you finally have boundaries." },
  { id: 13, from: "Tiny Wins \uD83C\uDFC6", message: "May you celebrate your small victories instead of immediately asking yourself, \u201cOkay, what\u2019s next?\u201d" },
  { id: 14, from: "Touch Some Grass \uD83C\uDF31", message: "May you spend a little less time staring at screens and a little more time actually living." },
  { id: 15, from: "Main Character, Not Main Stress \uD83D\uDE2D", message: "May you stop comparing your chapter 3 to somebody else\u2019s chapter 20." },
  { id: 16, from: "Try Things \uD83C\uDFA8", message: "May you do more things simply because they look fun, even if you\u2019re not immediately good at them." },
  { id: 17, from: "Future You \uD83D\uDD70\uFE0F", message: "May the person you become be proud of the person you are today." },
  { id: 18, from: "No More Settling \u2728", message: "May you have the courage to walk away from things that no longer feel right." },
  { id: 19, from: "One More Year \uD83C\uDF0E", message: "May 20 bring you places you\u2019ve never been, people you\u2019ve never met, and memories you didn\u2019t know you needed." },
  { id: 20, from: "The Final One \uD83D\uDC8C", message: "Here\u2019s to 20 years of becoming you.\nTo the mistakes, the chaos, the tiny victories, the questionable decisions, and everything still waiting ahead." },
];

/* Envelope colours cycled across the grid */
const COLORS = ["pink", "yellow", "green", "lavender", "peach"];

function Envelope({ letter, color, onOpen }) {
  return (
    <button
      className={`envelope envelope--${color}`}
      onClick={() => onOpen(letter)}
      aria-label={`Open ${letter.from}`}
      type="button"
    >
      <div className="envelope__body">
        <div className="envelope__flap" />
        <div className="envelope__seal">
          <span className="envelope__seal-heart">💌</span>
        </div>
        <span className="envelope__num">{letter.id}</span>
      </div>
      <p className="envelope__label">{letter.from}</p>
    </button>
  );
}

function CardModal({ letter, onClose }) {
  if (!letter) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="card-pop" onClick={e => e.stopPropagation()}>
        <button className="card-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="card-inner">
          <div className="card-header">
            <span className="card-icon">💌</span>
            <h2 className="card-title">{letter.from}</h2>
          </div>
          <div className="card-divider" />
          <p className="card-message">
            {letter.message || (
              <span className="card-empty">Coming soon… 🎀</span>
            )}
          </p>
          <div className="card-footer">— with love ✨</div>
        </div>
      </div>
    </div>
  );
}

export default function Surprises({ onBack }) {
  const [active, setActive] = useState(null);

  return (
    <div className="surprises-page">
      {/* Decorative floating hearts */}
      <div className="surp-floats" aria-hidden="true">
        {["💕", "🌸", "⭐", "✨", "🎀", "💫", "🎉", "💖"].map((e, i) => (
          <span key={i} className={`surp-float surp-float--${i + 1}`}>{e}</span>
        ))}
      </div>

      <div className="surp-content">
        <button className="surp-back" onClick={onBack} type="button">
          ← Back
        </button>

        <div className="surp-heading">
          <p className="surp-intro">A collection of words, just for you</p>
          <h1>20 <em>Wishes</em></h1>
          <p className="surp-sub">One for every year of being wonderful 🌟</p>
        </div>

        <div className="envelopes-grid">
          {LETTERS.map((letter, i) => (
            <Envelope
              key={letter.id}
              letter={letter}
              color={COLORS[i % COLORS.length]}
              onOpen={setActive}
            />
          ))}
        </div>

        <div className="surp-finale">
          <div className="surp-finale-divider" />
          <span className="surp-finale-icon">🎂</span>
          <h2 className="surp-finale-title"> Once again <br />Happy Birthday, Prataya.</h2>
          <p className="surp-finale-msg">
            Twenty years of being exactly who you are &mdash; messy, brilliant, overthinking, and completely irreplaceable.
            Here&rsquo;s to the next chapter being as beautifully chaotic as all the ones before it.
            You&rsquo;re going to be just fine. Actually, you&rsquo;re going to be more than fine.
          </p>
          <p className="surp-finale-sign">with all the love in the world ✨</p>
        </div>
      </div>

      {active && (
        <CardModal letter={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
