// ─────────────────────────────────────────────────────────────
// LETTER DATA  —  the 22 Hebrew letters (alef-bet)
// id         = the letter glyph shown big on screen
// name       = Hebrew name (with nikud) — spoken + shown
// translit   = latin spelling of the name
// sound      = the reading sound the letter makes (shown as text)
// nameAudio  = MP3 that speaks the letter's NAME  ("bet")
// soundAudio = MP3 that speaks the letter's SOUND ("ba")
// ─────────────────────────────────────────────────────────────
const LETTERS = [
  { id: 'א', name: 'אָלֶף',   translit: 'alef',   sound: 'a',  nameAudio: 'alef.mp3',   soundAudio: 'snd_alef.mp3'   },
  { id: 'ב', name: 'בֵּית',   translit: 'bet',    sound: 'b',  nameAudio: 'bet.mp3',    soundAudio: 'snd_bet.mp3'    },
  { id: 'ג', name: 'גִּימֶל', translit: 'gimel',  sound: 'g',  nameAudio: 'gimel.mp3',  soundAudio: 'snd_gimel.mp3'  },
  { id: 'ד', name: 'דָּלֶת',  translit: 'dalet',  sound: 'd',  nameAudio: 'dalet.mp3',  soundAudio: 'snd_dalet.mp3'  },
  { id: 'ה', name: 'הֵא',     translit: 'he',     sound: 'h',  nameAudio: 'he.mp3',     soundAudio: 'snd_he.mp3'     },
  { id: 'ו', name: 'וָו',     translit: 'vav',    sound: 'v',  nameAudio: 'vav.mp3',    soundAudio: 'snd_vav.mp3'    },
  { id: 'ז', name: 'זַיִן',   translit: 'zayin',  sound: 'z',  nameAudio: 'zayin.mp3',  soundAudio: 'snd_zayin.mp3'  },
  { id: 'ח', name: 'חֵית',    translit: 'chet',   sound: 'ch', nameAudio: 'chet.mp3',   soundAudio: 'snd_chet.mp3'   },
  { id: 'ט', name: 'טֵית',    translit: 'tet',    sound: 't',  nameAudio: 'tet.mp3',    soundAudio: 'snd_tet.mp3'    },
  { id: 'י', name: 'יוֹד',    translit: 'yod',    sound: 'y',  nameAudio: 'yod.mp3',    soundAudio: 'snd_yod.mp3'    },
  { id: 'כ', name: 'כַּף',    translit: 'kaf',    sound: 'k',  nameAudio: 'kaf.mp3',    soundAudio: 'snd_kaf.mp3'    },
  { id: 'ל', name: 'לָמֶד',   translit: 'lamed',  sound: 'l',  nameAudio: 'lamed.mp3',  soundAudio: 'snd_lamed.mp3'  },
  { id: 'מ', name: 'מֵם',     translit: 'mem',    sound: 'm',  nameAudio: 'mem.mp3',    soundAudio: 'snd_mem.mp3'    },
  { id: 'נ', name: 'נוּן',    translit: 'nun',    sound: 'n',  nameAudio: 'nun.mp3',    soundAudio: 'snd_nun.mp3'    },
  { id: 'ס', name: 'סָמֶךְ',  translit: 'samech', sound: 's',  nameAudio: 'samech.mp3', soundAudio: 'snd_samech.mp3' },
  { id: 'ע', name: 'עַיִן',   translit: 'ayin',   sound: 'a',  nameAudio: 'ayin.mp3',   soundAudio: 'snd_ayin.mp3'   },
  { id: 'פ', name: 'פֵּא',    translit: 'pe',     sound: 'p',  nameAudio: 'pe.mp3',     soundAudio: 'snd_pe.mp3'     },
  { id: 'צ', name: 'צָדִי',   translit: 'tsadi',  sound: 'ts', nameAudio: 'tsadi.mp3',  soundAudio: 'snd_tsadi.mp3'  },
  { id: 'ק', name: 'קוֹף',    translit: 'kuf',    sound: 'k',  nameAudio: 'kuf.mp3',    soundAudio: 'snd_kuf.mp3'    },
  { id: 'ר', name: 'רֵישׁ',   translit: 'resh',   sound: 'r',  nameAudio: 'resh.mp3',   soundAudio: 'snd_resh.mp3'   },
  { id: 'ש', name: 'שִׁין',   translit: 'shin',   sound: 'sh', nameAudio: 'shin.mp3',   soundAudio: 'snd_shin.mp3'   },
  { id: 'ת', name: 'תָּו',    translit: 'tav',    sound: 't',  nameAudio: 'tav.mp3',    soundAudio: 'snd_tav.mp3'    },
];

// ─────────────────────────────────────────────────────────────
// AUDIO
// ─────────────────────────────────────────────────────────────
let currentAudio = null;

function playSound(filename) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const audio = new Audio(`sounds/${filename}`);
  currentAudio = audio;
  audio.play().catch(() => {});
  return audio;
}

function playLetterName(letter)  { return playSound(letter.nameAudio); }
function playLetterSound(letter) { return playSound(letter.soundAudio); }

// Play the name, then the sound right after ("bet … ba").
function playLetterBoth(letter) {
  const a = playSound(letter.nameAudio);
  a.addEventListener('ended', () => {
    // guard: only chain if nothing newer started playing
    if (currentAudio === a) playSound(letter.soundAudio);
  }, { once: true });
}

function playCorrect() { playSound('correct.mp3'); }
function playWrong()   { playSound('incorrect.mp3'); }

// ─────────────────────────────────────────────────────────────
// SPACED REPETITION  (simplified SM-2)
// ─────────────────────────────────────────────────────────────
const STORAGE_KEY = 'kids_read_he_cards_v1';

function loadCards() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function defaultCard(id) {
  return { id, interval: 0, easeFactor: 2.5, repetitions: 0, dueDate: 0, introduced: false };
}

// quality: 5 = first try, 3 = one retry, 1 = two+ retries
function updateCard(letterId, quality) {
  const cards = loadCards();
  const card  = cards[letterId] || defaultCard(letterId);

  if (quality >= 3) {
    if      (card.repetitions === 0) card.interval = 1;
    else if (card.repetitions === 1) card.interval = 6;
    else                             card.interval = Math.round(card.interval * card.easeFactor);
    card.repetitions++;
  } else {
    card.repetitions = 0;
    card.interval    = 1;
  }

  card.easeFactor = Math.max(
    1.3,
    card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  card.dueDate    = Date.now() + card.interval * 24 * 60 * 60 * 1000;
  card.introduced = true;
  cards[letterId] = card;
  saveCards(cards);
}

// ─────────────────────────────────────────────────────────────
// SESSION  (active pool of 4 items)
// ─────────────────────────────────────────────────────────────
const ACTIVE_POOL_SIZE  = 4;   // max items in play at once
const GRADUATE_INTERVAL = 6;   // days — item "graduates" after 2 correct answers

function getSessionCards() {
  const cards = loadCards();
  const now   = Date.now();

  // Items currently being learned (introduced but not yet graduated)
  const active = LETTERS.filter(l => {
    const c = cards[l.id];
    return c?.introduced && c.interval < GRADUATE_INTERVAL;
  });

  // Fill empty slots with new items (in order)
  const slots   = Math.max(0, ACTIVE_POOL_SIZE - active.length);
  const newOnes = LETTERS.filter(l => !cards[l.id]?.introduced).slice(0, slots);
  const pool    = [...active, ...newOnes];

  // Cards due today or newly introduced
  const due = pool.filter(l => {
    const c = cards[l.id];
    return !c?.introduced || c.dueDate <= now;
  });

  // If nothing is due, fall back to the full active pool for extra practice
  return shuffle(due.length > 0 ? due : pool);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────
// QUESTION GENERATION
//   letter-to-name : see the letter → pick / hear its name
//   name-to-letter : hear the name  → pick the letter
// ─────────────────────────────────────────────────────────────
function generateQuestion(target) {
  const mode        = Math.random() < 0.5 ? 'letter-to-name' : 'name-to-letter';
  const distractors = shuffle(LETTERS.filter(l => l.id !== target.id)).slice(0, 3);
  const choices     = shuffle([...distractors, target]);
  return { mode, target, choices };
}

// ─────────────────────────────────────────────────────────────
// APP STATE
// ─────────────────────────────────────────────────────────────
let sessionCards    = [];
let currentIndex    = 0;
let currentQuestion = null;
let sessionStars    = 0;
let streak          = 0;
let answered        = false;
let totalStars      = 0;
let wrongAttempts   = 0;

// ─────────────────────────────────────────────────────────────
// INIT / NEXT
// ─────────────────────────────────────────────────────────────
function init() {
  totalStars   = parseInt(localStorage.getItem('total_stars') || '0');
  sessionStars = 0;
  streak       = 0;
  sessionCards = getSessionCards();
  currentIndex = 0;

  if (sessionCards.length === 0) {
    renderAllCaughtUp();
    return;
  }
  renderQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= sessionCards.length) {
    renderSessionComplete();
    return;
  }
  renderQuestion();
}

// ─────────────────────────────────────────────────────────────
// RENDER QUESTION
// ─────────────────────────────────────────────────────────────
function renderQuestion() {
  answered        = false;
  wrongAttempts   = 0;
  const target    = sessionCards[currentIndex];
  currentQuestion = generateQuestion(target);

  const area = document.getElementById('quiz-area');
  area.innerHTML = '';
  updateHeader();

  if (currentQuestion.mode === 'letter-to-name') {
    renderLetterToName(area);
  } else {
    renderNameToLetter(area);
  }
}

function renderLetterToName(container) {
  const { target, choices } = currentQuestion;

  container.appendChild(makeInstruction('אֵיךְ קוֹרְאִים לָאוֹת הַזֹּאת?'));

  const card = document.createElement('div');
  card.className = 'question-card';

  const big = document.createElement('div');
  big.className   = 'big-letter';
  big.textContent = target.id;
  card.appendChild(big);

  // Two speaker chips: hear the NAME and hear the SOUND it makes
  const chips = document.createElement('div');
  chips.className = 'audio-chips';

  const nameChip  = makeAudioChip('🔊 הַשֵּׁם',  () => playLetterName(target));
  const soundChip = makeAudioChip(`🔊 הַצְּלִיל · ${target.sound}`, () => playLetterSound(target));
  chips.appendChild(nameChip);
  chips.appendChild(soundChip);
  card.appendChild(chips);

  container.appendChild(card);
  container.appendChild(makeChoices(choices, target, /* showName */ true));
}

function renderNameToLetter(container) {
  const { target, choices } = currentQuestion;

  container.appendChild(makeInstruction('אֵיזוֹ אוֹת זֹאת?'));

  const card = document.createElement('div');
  card.className = 'question-card';
  const icon = document.createElement('div');
  icon.className   = 'sound-icon';
  icon.textContent = '🔊';
  icon.title       = 'לְחַץ כְּדֵי לִשְׁמֹעַ שׁוּב';
  icon.addEventListener('click', () => playLetterBoth(target));
  card.appendChild(icon);
  container.appendChild(card);

  // Auto-play name + sound after a short delay
  setTimeout(() => playLetterBoth(target), 400);

  container.appendChild(makeChoices(choices, target, /* showName */ false));
}

// ─────────────────────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────────────────────
function makeInstruction(text) {
  const el = document.createElement('div');
  el.className   = 'instruction';
  el.textContent = text;
  return el;
}

function makeAudioChip(label, onClick) {
  const chip = document.createElement('button');
  chip.className   = 'audio-chip';
  chip.textContent = label;
  chip.addEventListener('click', onClick);
  return chip;
}

function makeChoices(choices, target, showName) {
  const grid = document.createElement('div');
  grid.className = 'choices';

  choices.forEach(letter => {
    const btn = document.createElement('button');
    btn.className  = 'choice-btn';
    btn.dataset.id = letter.id;

    if (showName) {
      // choice shows the Hebrew name only
      btn.innerHTML = `<span class="choice-name">${letter.name}</span>`;
    } else {
      // choice is the letter glyph
      btn.textContent = letter.id;
      btn.classList.add('choice-glyph');
    }

    btn.addEventListener('click', () => {
      if (answered) return;
      handleAnswer(btn, letter.id === target.id);
    });

    if (showName) {
      // Wrap button + standalone speaker so kids can hear each name
      const wrap = document.createElement('div');
      wrap.className = 'choice-wrap';

      const speaker = document.createElement('button');
      speaker.className   = 'speaker-btn';
      speaker.textContent = '🔊';
      speaker.title       = 'שֵׁם וּצְלִיל';
      speaker.addEventListener('click', () => playLetterBoth(letter));

      wrap.appendChild(btn);
      wrap.appendChild(speaker);
      grid.appendChild(wrap);
    } else {
      grid.appendChild(btn);
    }
  });

  return grid;
}

// ─────────────────────────────────────────────────────────────
// ANSWER HANDLING
// ─────────────────────────────────────────────────────────────
function handleAnswer(btn, correct) {
  if (correct) {
    answered = true;
    document.querySelectorAll('.choice-btn, .speaker-btn').forEach(b => { b.disabled = true; });
    btn.classList.add('correct');
    playCorrect();
    showFeedbackBadge('🌟');

    // quality: 5 = no mistakes, 3 = one mistake, 1 = two+ mistakes
    const quality = wrongAttempts === 0 ? 5 : wrongAttempts === 1 ? 3 : 1;
    updateCard(currentQuestion.target.id, quality);

    sessionStars++;
    totalStars++;
    localStorage.setItem('total_stars', totalStars);
    if (wrongAttempts === 0) streak++;
    updateHeader();

    if (wrongAttempts === 0 && streak % 5 === 0 && streak > 0) {
      showOverlay('🌟', '🎉 מְעֻלֶּה! 🎉', `${streak} בָּרֶצֶף!`);
      setTimeout(nextQuestion, 2600);
    } else {
      setTimeout(nextQuestion, 1100);
    }
  } else {
    // Disable only this button — keep others active for retry
    btn.disabled = true;
    btn.classList.add('wrong');
    playWrong();
    showFeedbackBadge('🙈');

    if (wrongAttempts === 0) {
      streak = 0;
      updateHeader();
    }
    wrongAttempts++;
  }
}

// ─────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────
function updateHeader() {
  document.getElementById('star-count').textContent   = totalStars;
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('session-progress').textContent =
    `${Math.min(currentIndex + 1, sessionCards.length)} / ${sessionCards.length}`;
}

// ─────────────────────────────────────────────────────────────
// OVERLAY / FEEDBACK
// ─────────────────────────────────────────────────────────────
function showFeedbackBadge(emoji) {
  const badge = document.createElement('div');
  badge.className   = 'feedback-badge';
  badge.textContent = emoji;
  document.body.appendChild(badge);
  setTimeout(() => badge.remove(), 700);
}

function showOverlay(emoji, title, sub) {
  const overlay = document.getElementById('overlay');
  overlay.innerHTML = `
    <div class="overlay-emoji">${emoji}</div>
    <div class="overlay-title">${title}</div>
    <div class="overlay-sub">${sub}</div>
  `;
  overlay.classList.remove('hidden');
  setTimeout(() => overlay.classList.add('hidden'), 2200);
}

// ─────────────────────────────────────────────────────────────
// END SCREENS
// ─────────────────────────────────────────────────────────────
function renderSessionComplete() {
  const area  = document.getElementById('quiz-area');
  const emoji = sessionStars === sessionCards.length ? '🏆' : '🎊';
  area.innerHTML = `
    <div class="complete-screen">
      <h1>${emoji} כָּל הַכָּבוֹד! ${emoji}</h1>
      <p>עָנִיתָ נָכוֹן עַל <strong>${sessionStars}</strong> מִתּוֹךְ <strong>${sessionCards.length}</strong>!</p>
      <p>סַךְ הַכֹּל כּוֹכָבִים: ⭐ ${totalStars}</p>
      <button class="play-again-btn" id="play-again">עוֹד פַּעַם! 🚀</button>
    </div>
  `;
  document.getElementById('play-again').addEventListener('click', init);
}

function renderAllCaughtUp() {
  const area = document.getElementById('quiz-area');
  area.innerHTML = `
    <div class="complete-screen">
      <h1>🌈 כָּל הַכָּבוֹד!</h1>
      <p>סִיַּמְתָּ אֶת כָּל הָאוֹתִיּוֹת לְהַיּוֹם.</p>
      <p>חֲזֹר מָחָר לְעוֹד תִּרְגּוּל.</p>
      <p>סַךְ הַכֹּל כּוֹכָבִים: ⭐ ${totalStars}</p>
      <button class="play-again-btn" id="play-again">עוֹד פַּעַם! 🚀</button>
    </div>
  `;
  document.getElementById('play-again').addEventListener('click', init);
}

// ─────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('לְאַפֵּס אֶת כָּל הַהִתְקַדְּמוּת וְהַכּוֹכָבִים?')) {
      localStorage.clear();
      init();
    }
  });

  init();
});
