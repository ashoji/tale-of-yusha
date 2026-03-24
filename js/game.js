// ===== 勇者ものがたり - Game Engine =====
'use strict';

// === Constants ===
const T = 16, VCOLS = 16, VROWS = 12, SW = 256, SH = 240;
const STATUS_Y = VROWS * T, STATUS_H = SH - STATUS_Y;
const MOVE_DELAY = 14;
const TILE_NAMES = ['grass','water','mountain','forest','town','cave','castle','bridge','desert','swamp'];
const INDOOR_TILES = ['floor','wall','grass','water','counter','door','stairs','chest','floor'];

// === Audio ===
let audioCtx = null;
let soundEnabled = localStorage.getItem('yuusha_sound') !== 'off';
function ensureAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
function playSound(freq, dur, vol=0.08, type='square') {
  if (!soundEnabled) return;
  try {
    ensureAudio();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch(e) {}
}
function sfx(name) {
  const s = { cursor:[800,0.05], confirm:[1200,0.08], cancel:[400,0.08], hit:[200,0.1],
    damage:[150,0.12], heal:[880,0.15,'sine'], levelup:[1320,0.3,'sine'], step:[300,0.02],
    miss:[100,0.06], victory:[660,0.2,'sine'], open:[600,0.1], encounter:[220,0.15] };
  const p = s[name]; if (p) playSound(p[0], p[1], 0.08, p[2]||'square');
}

// === BGM System ===
const BGM = {
  playing: null, timer: null, stopRequested: false,
  // Note frequencies
  N: {
    C2:65,D2:73,E2:82,F2:87,G2:98,A2:110,B2:123,
    C3:131,D3:147,E3:165,F3:175,G3:196,A3:220,B3:247,
    C4:262,D4:294,E4:330,F4:349,G4:392,A4:440,B4:494,
    C5:523,D5:587,E5:659,F5:698,G5:784,A5:880,B5:988,
    C6:1047,R:0,
    Cs2:69,Ds2:78,Fs2:92,Gs2:104,As2:117,
    Cs3:139,Ds3:156,Fs3:185,Gs3:208,As3:233,
    Cs4:277,Ds4:311,Fs4:370,Gs4:415,As4:466,
    Cs5:554,Ds5:622,Fs5:740,Gs5:831,As5:932,
  },
  play(songId) {
    this.stop();
    this.stopRequested = false;
    if (!soundEnabled) return;
    const song = BGM_SONGS[songId];
    if (!song) return;
    this.playing = songId;
    this._playSong(song, 0);
  },
  stop() {
    this.stopRequested = true;
    this.playing = null;
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
  },
  _playSong(song, idx) {
    if (this.stopRequested) return;
    if (idx >= song.notes.length) {
      if (song.loop) { idx = song.loopStart || 0; }
      else { this.playing = null; return; }
    }
    const [note, dur] = song.notes[idx];
    const freq = typeof note === 'string' ? this.N[note] : note;
    if (freq > 0) {
      try {
        ensureAudio();
        const t = audioCtx.currentTime;
        // Voice 1: Melody
        const o1 = audioCtx.createOscillator(), g1 = audioCtx.createGain();
        o1.type = song.wave || 'square';
        o1.frequency.value = freq;
        g1.gain.setValueAtTime(song.vol || 0.06, t);
        g1.gain.setValueAtTime(song.vol || 0.06, t + dur * 0.7);
        g1.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
        o1.connect(g1); g1.connect(audioCtx.destination);
        o1.start(t); o1.stop(t + dur);
        // Voice 2: Harmony
        if (song.notes[idx].length > 2 && song.notes[idx][2]) {
          const hFreq = typeof song.notes[idx][2] === 'string' ? this.N[song.notes[idx][2]] : song.notes[idx][2];
          if (hFreq > 0) {
            const o2 = audioCtx.createOscillator(), g2 = audioCtx.createGain();
            o2.type = song.wave2 || 'triangle';
            o2.frequency.value = hFreq;
            g2.gain.setValueAtTime(0.035, t);
            g2.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.9);
            o2.connect(g2); g2.connect(audioCtx.destination);
            o2.start(t); o2.stop(t + dur);
          }
        }
        // Voice 3: Bass
        if (song.notes[idx].length > 3 && song.notes[idx][3]) {
          const bFreq = typeof song.notes[idx][3] === 'string' ? this.N[song.notes[idx][3]] : song.notes[idx][3];
          if (bFreq > 0) {
            const o3 = audioCtx.createOscillator(), g3 = audioCtx.createGain();
            o3.type = song.wave3 || 'triangle';
            o3.frequency.value = bFreq;
            g3.gain.setValueAtTime(0.04, t);
            g3.gain.setValueAtTime(0.04, t + dur * 0.6);
            g3.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.85);
            o3.connect(g3); g3.connect(audioCtx.destination);
            o3.start(t); o3.stop(t + dur);
          }
        }
      } catch(e) {}
    }
    this.timer = setTimeout(() => this._playSong(song, idx + 1), dur * 1000);
  }
};

// --- Song Data ---
// Notes: [melody, duration, harmony, bass]  (harmony/bass optional)
const BGM_SONGS = {
  title: {
    wave: 'square', wave2: 'triangle', wave3: 'triangle', vol: 0.05, loop: true, loopStart: 16,
    notes: [
      // Intro fanfare
      ['E4',0.30,'C4','C3'], ['E4',0.15,null,'C3'], ['E4',0.30,'C4','E3'], ['G4',0.45,'E4','C3'],
      ['R',0.15],
      ['D4',0.30,'B3','G2'], ['D4',0.15,null,'G2'], ['D4',0.30,'B3','B2'], ['F4',0.45,'D4','G2'],
      ['R',0.15],
      ['E4',0.20,'C4','A2'], ['F4',0.20,'D4','D3'], ['G4',0.20,'E4','E3'], ['A4',0.20,'F4','F3'],
      ['G4',0.30,'E4','C3'], ['E4',0.30,'C4','G2'], ['C5',0.60,'E4','C3'],
      ['R',0.30],
      // Main melody (loop point)
      ['G4',0.25,'E4','C3'], ['A4',0.25,'F4','F2'], ['B4',0.25,'G4','G2'], ['C5',0.50,'E4','C3'],
      ['R',0.12],
      ['B4',0.25,'G4','G2'], ['A4',0.25,'F4','F2'], ['G4',0.50,'E4','C3'],
      ['R',0.12],
      ['E4',0.25,'C4','A2'], ['F4',0.25,'D4','D3'], ['G4',0.25,'E4','E3'], ['A4',0.50,'F4','F3'],
      ['R',0.12],
      ['G4',0.25,'E4','C3'], ['F4',0.25,'D4','G2'], ['E4',0.50,'C4','C3'],
      ['R',0.25],
      ['C5',0.25,'E4','A2'], ['B4',0.25,'D4','G2'], ['A4',0.25,'C4','F2'], ['G4',0.25,'E4','E2'],
      ['A4',0.25,'F4','F2'], ['B4',0.25,'G4','G2'], ['C5',0.60,'E4','C3'],
      ['R',0.12],
      ['G4',0.20,'E4','C3'], ['G4',0.20,null,'E3'], ['A4',0.20,'F4','F3'], ['B4',0.20,'G4','G2'],
      ['C5',0.30,'E4','A2'], ['D5',0.30,'G4','B2'], ['E5',0.60,'C5','C3'],
      ['R',0.12],
      ['D5',0.25,'B4','G2'], ['C5',0.25,'A4','F2'], ['B4',0.25,'G4','G2'], ['A4',0.50,'F4','D3'],
      ['R',0.12],
      ['G4',0.25,'E4','C3'], ['F4',0.20,'D4','B2'], ['E4',0.20,'C4','A2'], ['D4',0.20,'B3','G2'],
      ['C4',0.60,'E3','C2'],
      ['R',0.50],
    ],
  },
  field: {
    wave: 'triangle', wave2: 'sine', wave3: 'triangle', vol: 0.06, loop: true, loopStart: 0,
    notes: [
      // Pastoral walking theme - Am-F-G-C progression
      ['E4',0.35,'C4','A2'], ['E4',0.35,'C4','E3'], ['D4',0.35,'A3','F2'], ['D4',0.35,'A3','C3'],
      ['D4',0.35,'B3','G2'], ['D4',0.35,'B3','D3'], ['C4',0.35,'G3','C2'], ['C4',0.35,'E3','G2'],
      ['R',0.20],
      ['E4',0.35,'C4','A2'], ['G4',0.35,'E4','E3'], ['F4',0.35,'D4','D3'], ['E4',0.35,'C4','A2'],
      ['D4',0.35,'B3','G2'], ['E4',0.35,'C4','C3'], ['D4',0.35,'B3','G2'], ['C4',0.70,'E3','C2'],
      ['R',0.20],
      ['G4',0.35,'E4','C3'], ['A4',0.35,'F4','F2'], ['G4',0.35,'E4','E2'], ['E4',0.35,'C4','A2'],
      ['F4',0.35,'D4','D3'], ['E4',0.35,'C4','C3'], ['D4',0.35,'A3','F2'], ['C4',0.35,'E3','C2'],
      ['C4',0.70,'G3','C3'],
      ['R',0.40],
    ],
  },
  battle: {
    wave: 'square', wave2: 'square', wave3: 'triangle', vol: 0.045, loop: true, loopStart: 0,
    notes: [
      // Urgent battle theme - Em driving rhythm
      ['E4',0.12,'B3','E2'], ['R',0.06], ['E4',0.12,'B3','E2'], ['G4',0.12,'E4','E3'],
      ['A4',0.18,'E4','A2'], ['G4',0.12,'D4','G2'], ['E4',0.12,'B3','E2'], ['R',0.06],
      ['D4',0.12,'A3','D3'], ['E4',0.24,'B3','E2'],
      ['R',0.10],
      ['B4',0.12,'G4','E3'], ['A4',0.12,'E4','A2'], ['G4',0.12,'D4','B2'], ['E4',0.12,'B3','E2'],
      ['Fs4',0.18,'D4','D3'], ['G4',0.12,'E4','G2'], ['A4',0.12,'Fs4','D3'], ['B4',0.24,'G4','E3'],
      ['R',0.10],
      ['E4',0.12,'C4','A2'], ['E4',0.12,null,'A2'], ['G4',0.12,'E4','C3'], ['A4',0.12,'E4','A2'],
      ['B4',0.18,'G4','E3'], ['A4',0.12,'E4','A2'], ['G4',0.12,'D4','G2'], ['E4',0.24,'C4','C3'],
      ['R',0.10],
      ['A4',0.12,'E4','A2'], ['G4',0.12,'D4','G2'], ['E4',0.12,'C4','E2'], ['D4',0.12,'B3','G2'],
      ['E4',0.18,'B3','E2'], ['Fs4',0.12,'D4','D3'], ['G4',0.12,'E4','E2'], ['E4',0.24,'B3','E2'],
      ['R',0.15],
    ],
  },
  boss: {
    wave: 'square', wave2: 'sawtooth', wave3: 'triangle', vol: 0.045, loop: true, loopStart: 0,
    notes: [
      // Menacing boss theme - chromatic tension
      ['E4',0.10,'B3','E2'], ['R',0.05], ['E4',0.10,'B3','E2'], ['R',0.05],
      ['Ds4',0.10,'As3','Ds2'], ['R',0.05], ['E4',0.10,'B3','E2'], ['R',0.05],
      ['G4',0.15,'E4','E3'], ['Fs4',0.10,'Ds4','B2'], ['E4',0.10,'B3','E2'], ['Ds4',0.20,'As3','Ds3'],
      ['R',0.10],
      ['A3',0.10,'E3','A2'], ['R',0.05], ['A3',0.10,'E3','A2'], ['R',0.05],
      ['Gs3',0.10,'E3','Gs2'], ['R',0.05], ['A3',0.10,'E3','A2'], ['R',0.05],
      ['C4',0.15,'A3','A2'], ['B3',0.10,'Gs3','E2'], ['A3',0.10,'E3','A2'], ['Gs3',0.20,'E3','Gs2'],
      ['R',0.10],
      ['E4',0.15,'C4','A2'], ['Ds4',0.15,'B3','Gs2'],
      ['D4',0.15,'A3','F2'], ['Cs4',0.15,'A3','E2'],
      ['C4',0.10,'G3','C2'], ['B3',0.10,'G3','G2'], ['As3',0.10,'F3','F2'],
      ['B3',0.30,'Gs3','E2'],
      ['R',0.15],
    ],
  },
  town: {
    wave: 'sine', wave2: 'triangle', wave3: 'sine', vol: 0.05, loop: true, loopStart: 0,
    notes: [
      // Warm town theme - C-Am-F-G waltz feel
      ['E4',0.30,'C4','C2'], ['G4',0.30,'E4','E3'], ['C5',0.30,'G4','C3'], ['G4',0.30,'E4','G2'],
      ['F4',0.30,'C4','F2'], ['A4',0.30,'F4','A2'], ['C5',0.30,'A4','C3'], ['A4',0.30,'F4','F2'],
      ['D4',0.30,'A3','D2'], ['F4',0.30,'D4','F2'], ['A4',0.30,'F4','A2'], ['F4',0.30,'D4','D2'],
      ['B3',0.30,'G3','G2'], ['D4',0.30,'B3','B2'], ['G4',0.30,'D4','D3'], ['G4',0.60,'B3','G2'],
      ['R',0.15],
      ['C4',0.25,'E3','C2'], ['E4',0.25,'G3','G2'], ['G4',0.40,'C4','C3'], ['E4',0.20,'G3','E2'],
      ['F4',0.25,'A3','F2'], ['A4',0.25,'C4','C3'], ['G4',0.40,'B3','G2'], ['E4',0.20,'G3','E2'],
      ['A4',0.25,'E4','A2'], ['G4',0.25,'D4','G2'], ['F4',0.25,'C4','F2'], ['E4',0.25,'C4','E2'],
      ['D4',0.25,'A3','D2'], ['E4',0.25,'B3','G2'], ['C4',0.60,'G3','C2'],
      ['R',0.30],
    ],
  },
  zomt: {
    wave: 'sawtooth', wave2: 'square', wave3: 'triangle', vol: 0.04, loop: true, loopStart: 0,
    notes: [
      // Dread-filled final boss - low rumbling bass
      ['E3',0.20,'B3','E2'], ['R',0.10], ['E3',0.20,'B3','E2'], ['Ds3',0.20,'As3','Ds2'],
      ['R',0.10], ['D3',0.20,'A3','D2'], ['Cs3',0.40,'Gs3','Cs2'],
      ['R',0.20],
      ['E3',0.12,'Gs3','E2'], ['R',0.06], ['E3',0.12,'Gs3','E2'], ['R',0.06],
      ['Gs3',0.24,'B3','E2'], ['R',0.10],
      ['E3',0.12,'B3','E2'], ['R',0.06], ['E3',0.12,'B3','E2'], ['R',0.06],
      ['B3',0.24,'E4','B2'], ['R',0.10],
      ['Cs3',0.30,'E3','Cs2'], ['R',0.10], ['D3',0.30,'Fs3','D2'], ['R',0.10],
      ['E3',0.15,'Gs3','E2'], ['Fs3',0.15,'A3','Fs2'], ['Gs3',0.15,'B3','Gs2'], ['B3',0.15,'E4','B2'],
      ['Gs3',0.15,'B3','Gs2'], ['Fs3',0.15,'A3','Fs2'], ['E3',0.15,'Gs3','E2'], ['Cs3',0.15,'E3','Cs2'],
      ['D3',0.20,'Fs3','D2'], ['R',0.06], ['D3',0.12,'Fs3','D2'], ['R',0.06],
      ['Ds3',0.20,'Fs3','Ds2'], ['R',0.06], ['Ds3',0.12,'Fs3','Ds2'], ['R',0.06],
      ['E3',0.40,'Gs3','E2'], ['R',0.30],
    ],
  },
  ending: {
    wave: 'sine', wave2: 'triangle', wave3: 'sine', vol: 0.06, loop: false,
    notes: [
      // Triumphant ending fanfare - full orchestra feel
      ['C4',0.40,'E4','C2'], ['E4',0.40,'G4','E2'], ['G4',0.40,'C5','G2'], ['C5',0.80,'E5','C3'],
      ['R',0.30],
      ['G4',0.30,'C5','E3'], ['A4',0.30,'C5','F2'], ['B4',0.30,'D5','G2'], ['C5',0.60,'E5','C3'],
      ['R',0.20],
      ['E4',0.30,'G4','C2'], ['F4',0.30,'A4','F2'], ['G4',0.30,'B4','G2'], ['A4',0.60,'C5','A2'],
      ['R',0.20],
      ['F4',0.30,'A4','D2'], ['E4',0.30,'G4','C2'], ['D4',0.30,'F4','G2'], ['C4',0.80,'E4','C2'],
      ['R',0.40],
      // Gentle melody
      ['E4',0.35,'G4','C3'], ['G4',0.35,'C5','E3'], ['C5',0.35,'E5','G2'], ['E5',0.70,'G5','C3'],
      ['R',0.20],
      ['D5',0.30,'F5','D3'], ['C5',0.30,'E5','A2'], ['B4',0.30,'D5','G2'], ['A4',0.60,'C5','F2'],
      ['R',0.20],
      ['G4',0.30,'B4','G2'], ['A4',0.30,'C5','F2'], ['B4',0.30,'D5','G2'], ['C5',0.50,'E5','C3'],
      ['R',0.15],
      ['B4',0.25,'D5','G2'], ['A4',0.25,'C5','F2'], ['G4',0.50,'B4','G2'],
      ['R',0.20],
      // Resolving phrase
      ['C5',0.40,'E5','C3'], ['B4',0.30,'D5','G2'], ['A4',0.30,'C5','A2'], ['G4',0.30,'B4','E2'],
      ['F4',0.30,'A4','F2'], ['E4',0.30,'G4','C2'], ['D4',0.30,'F4','G2'],
      ['C4',1.20,'E4','C2'],
      ['R',0.60],
      // Final grand chord - arpeggiated
      ['C4',0.20,null,'C2'], ['E4',0.20,null,'E2'], ['G4',0.20,'C4','G2'],
      ['C5',0.20,'E4','C3'], ['E5',0.20,'G4','E3'], ['G5',0.20,'C5','G3'],
      ['C5',1.50,'E5','C3'],
    ],
  },
};


// === Input ===
const keys = {}, jp = {};
const touch = { up:false, down:false, left:false, right:false, a:false, b:false };
const touchPrev = { a:false, b:false, up:false, down:false, left:false, right:false };

window.addEventListener('keydown', e => { if(!keys[e.key]) jp[e.key]=true; keys[e.key]=true; e.preventDefault(); });
window.addEventListener('keyup', e => { keys[e.key]=false; });

function setupTouch() {
  const handle = (e, down) => {
    e.preventDefault();
    const tgts = e.changedTouches ? Array.from(e.changedTouches) : [e];
    tgts.forEach(t => {
      const el = document.elementFromPoint(t.clientX, t.clientY);
      if (el && el.dataset.btn) touch[el.dataset.btn] = down;
    });
  };
  document.querySelectorAll('.cb').forEach(b => {
    b.addEventListener('touchstart', e => handle(e, true), {passive:false});
    b.addEventListener('touchend', e => { touch[b.dataset.btn]=false; e.preventDefault(); }, {passive:false});
    b.addEventListener('touchcancel', e => { touch[b.dataset.btn]=false; }, {passive:false});
  });
}

function isDir(d) {
  const km = {up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'};
  const wm = {up:'w',down:'s',left:'a',right:'d'};
  return keys[km[d]] || keys[wm[d]] || jp[km[d]] || jp[wm[d]] || touch[d];
}
function isDirOnce(d) {
  const km = {up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'};
  const wm = {up:'w',down:'s',left:'a',right:'d'};
  return jp[km[d]] || jp[wm[d]] || (touch[d] && !touchPrev[d]);
}
function isA() { return jp['Enter'] || jp[' '] || jp['z'] || (touch.a && !touchPrev.a); }
function isB() { return jp['Escape'] || jp['x'] || jp['Backspace'] || (touch.b && !touchPrev.b); }
function clearJP() {
  Object.keys(jp).forEach(k => delete jp[k]);
  Object.keys(touch).forEach(k => { touchPrev[k] = touch[k]; });
}

// === Sprite Cache ===
const spriteCache = {};
function getSprite(name) {
  if (spriteCache[name]) return spriteCache[name];
  const data = SPRITES[name];
  if (!data) return null;
  const c = document.createElement('canvas');
  c.width = T; c.height = T;
  const ct = c.getContext('2d');
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      const ci = parseInt(row[x], 16);
      if (ci === 0) continue;
      ct.fillStyle = PALETTE[ci];
      ct.fillRect(x, y, 1, 1);
    }
  }
  spriteCache[name] = c;
  return c;
}

// === Game Class ===
class Game {
  constructor() {
    this.cv = document.getElementById('gameCanvas');
    this.ctx = this.cv.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.state = 'title';
    this.player = null;
    this.moveTimer = 0;
    this.bufferedDir = null;
    this.moveRepeat = 0;
    this.mapId = 'world';
    this.msg = []; this.msgIdx = 0; this.msgCb = null;
    this.menuIdx = 0; this.menuSub = null; this.menuSubIdx = 0;
    this.battle = null;
    this.shop = null;
    this.frame = 0;
    this.textTimer = 0; this.textChar = 0;
    this.fade = 0; this.fadeDir = 0; this.fadeCb = null;
    this.ending = false;
    this.endingPhase = 0;
    this.endingTimer = 0;
    this.chestStates = {};
    this.confirmMsg = ''; this.confirmIdx = 0; this.confirmCb = null;
  }

  init() {
    this.player = {
      x:10, y:25, hp:15, maxHp:15, mp:0, maxMp:0,
      level:1, exp:0, gold:20, atk:3, def:2, spd:3,
      weapon:null, armor:null, shield:null,
      items:['herb','herb','herb'],
      spells:[], flags:{}, lastTown:'startTown'
    };
    this.mapId = 'world';
    this.loadChestStates();
  }

  newGame() {
    this.init();
    this.state = 'field';
    this.chestStates = {};
  }

  start() {
    setupTouch();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    const loop = () => { this.frame++; this.update(); this.render(); clearJP(); requestAnimationFrame(loop); };
    loop();
  }

  resize() {
    const cw = window.innerWidth, ch = window.innerHeight;
    const isMobile = 'ontouchstart' in window;
    const avH = isMobile ? ch * 0.55 : ch;
    const scale = Math.min(cw / SW, avH / SH);
    const finalScale = isMobile ? scale : (Math.floor(scale) || 1);
    this.cv.style.width = Math.floor(SW * finalScale) + 'px';
    this.cv.style.height = Math.floor(SH * finalScale) + 'px';
  }

  // --- Map helpers ---
  currentMap() { return MAPS[this.mapId]; }
  getTile(x, y) {
    const m = this.currentMap();
    if (x < 0 || y < 0 || x >= m.width || y >= m.height) return 1; // wall/water
    const row = m.tiles[y];
    return Array.isArray(row) ? row[x] : (row ? row[x] : 1);
  }
  isWalkable(x, y) {
    const t = this.getTile(x, y);
    if (this.mapId === 'world') return t !== 1 && t !== 2; // water & mountain block
    return t !== 1 && t !== 3 && t !== 4; // wall, water, counter block indoors
  }
  getNpcAt(x, y) {
    const m = this.currentMap();
    if (!m.npcs) return null;
    return m.npcs.find(n => n.x === x && n.y === y);
  }
  getChestAt(x, y) {
    const m = this.currentMap();
    if (!m.chests) return null;
    return m.chests.find(c => c.x === x && c.y === y);
  }
  isChestOpen(mapId, x, y) {
    return this.chestStates[`${mapId}_${x}_${y}`];
  }
  openChest(mapId, x, y) {
    this.chestStates[`${mapId}_${x}_${y}`] = true;
  }
  loadChestStates() {} // loaded from save

  getEncounterTable() {
    if (this.mapId === 'cave') return ENCOUNTER_TABLES.cave;
    if (this.mapId === 'darkCastle') return ENCOUNTER_TABLES.castle;
    if (this.mapId === 'world') {
      const p = this.player;
      const dist = Math.sqrt((p.x-10)**2 + (p.y-24)**2);
      if (dist < 5) return ENCOUNTER_TABLES.near;
      if (dist < 10) return ENCOUNTER_TABLES.midnear;
      if (dist < 16) return ENCOUNTER_TABLES.mid;
      return ENCOUNTER_TABLES.far;
    }
    return null;
  }

  // --- Rendering helpers ---
  drawTile(tileId, sx, sy) {
    const name = this.mapId === 'world' ? TILE_NAMES[tileId] : INDOOR_TILES[tileId];
    if (!name) return;
    let tname = name;
    if (tileId === 7 && this.mapId !== 'world') {
      // check if chest is open
      tname = 'chest';
    }
    const sp = getSprite(tname);
    if (sp) this.ctx.drawImage(sp, sx, sy);
  }

  drawWindow(x, y, w, h) {
    const c = this.ctx;
    c.fillStyle = '#000088';
    c.fillRect(x, y, w, h);
    c.strokeStyle = '#FFFFFF';
    c.lineWidth = 2;
    c.strokeRect(x + 3, y + 3, w - 6, h - 6);
  }

  drawText(str, x, y, color='#FFFFFF', size=11) {
    this.ctx.fillStyle = color;
    this.ctx.font = `bold ${size}px monospace, "MS Gothic", sans-serif`;
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(str, x, y);
  }

  drawStatusBar() {
    this.drawWindow(0, STATUS_Y, SW, STATUS_H);
    const p = this.player;
    this.drawText(`Lv${p.level}`, 8, STATUS_Y + 6);
    this.drawText(`HP${p.hp}/${p.maxHp}`, 56, STATUS_Y + 6);
    this.drawText(`MP${p.mp}/${p.maxMp}`, 148, STATUS_Y + 6);
    this.drawText(`G${p.gold}`, 8, STATUS_Y + 20);
    this.drawText(`EXP${p.exp}`, 80, STATUS_Y + 20);
  }

  drawSprite(name, sx, sy) {
    const sp = getSprite(name);
    if (sp) this.ctx.drawImage(sp, sx, sy);
  }

  drawMap() {
    const p = this.player;
    const m = this.currentMap();
    const halfX = Math.floor(VCOLS / 2), halfY = Math.floor(VROWS / 2);
    const ox = p.x - halfX, oy = p.y - halfY;

    for (let vy = 0; vy < VROWS; vy++) {
      for (let vx = 0; vx < VCOLS; vx++) {
        const mx = ox + vx, my = oy + vy;
        const tile = this.getTile(mx, my);

        // Dark dungeon rendering
        if (m.dark && !this.player.flags.hasTorch) {
          const dx = mx - p.x, dy = my - p.y;
          if (dx*dx + dy*dy > 4) {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(vx * T, vy * T, T, T);
            continue;
          }
        }

        this.drawTile(tile, vx * T, vy * T);

        // Draw chest sprites for indoor maps
        if (this.mapId !== 'world' && tile === 7) {
          const chest = this.getChestAt(mx, my);
          if (chest && this.isChestOpen(this.mapId, mx, my)) {
            this.drawSprite('chestOpen', vx * T, vy * T);
          } else {
            this.drawSprite('chest', vx * T, vy * T);
          }
        }

        // Draw NPCs
        const npc = this.getNpcAt(mx, my);
        if (npc) this.drawSprite(npc.sprite, vx * T, vy * T);

        // Draw boss
        if (m.boss && mx === m.boss.x && my === m.boss.y && !this.player.flags.bossDefeated) {
          this.ctx.fillStyle = '#440044';
          this.ctx.fillRect(vx*T+4, vy*T+2, 8, 12);
          this.ctx.fillStyle = '#FF0000';
          this.ctx.fillRect(vx*T+5, vy*T+4, 2, 2);
          this.ctx.fillRect(vx*T+9, vy*T+4, 2, 2);
        }

        // Draw mid-boss
        if (m.midBoss && mx === m.midBoss.x && my === m.midBoss.y && !this.player.flags[m.midBoss.flag]) {
          this.ctx.fillStyle = '#664433';
          this.ctx.fillRect(vx*T+3, vy*T+1, 10, 14);
          this.ctx.fillStyle = '#FF4400';
          this.ctx.fillRect(vx*T+5, vy*T+4, 2, 2);
          this.ctx.fillRect(vx*T+9, vy*T+4, 2, 2);
          this.ctx.fillStyle = '#888899';
          this.ctx.fillRect(vx*T+12, vy*T+3, 2, 10);
        }
      }
    }

    // Draw hero at center
    this.drawSprite('hero', halfX * T, halfY * T);
  }

  // --- State: Title ---
  updateTitle() {
    // Start title BGM on first user interaction
    if ((isA() || isDirOnce('up') || isDirOnce('down')) && BGM.playing !== 'title') {
      BGM.play('title');
    }
    if (isA()) {
      sfx('confirm');
      BGM.stop();
      if (this.menuIdx === 0) { this.newGame(); BGM.play('field'); }
      else if (this.menuIdx === 1) { this.loadGame(); BGM.play('field'); }
    }
    if (isDirOnce('up') || isDirOnce('down')) {
      sfx('cursor');
      this.menuIdx = this.menuIdx === 0 ? 1 : 0;
    }
  }

  renderTitle() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, SW, SH);
    this.drawText('勇者ものがたり', 48, 40, '#FFDD33', 18);
    this.drawText('～ ひかりのつるぎを もとめて ～', 20, 70, '#AAAAFF', 10);
    this.drawWindow(60, 120, 136, 70);
    this.drawText('はじめから', 90, 135);
    this.drawText('つづきから', 90, 160);
    this.drawText('▶', 76, this.menuIdx === 0 ? 135 : 160, '#FFDD33');
    this.drawText('© 2026 Yuusha Monogatari', 32, 220, '#666666', 8);
  }

  // --- State: Field ---
  updateField() {
    if (this.fadeDir) return;

    // Menu
    if (isB()) {
      sfx('confirm');
      this.state = 'menu';
      this.menuIdx = 0;
      this.menuSub = null;
      return;
    }

    // Action (talk / examine)
    if (isA()) {
      this.handleFieldAction();
      return;
    }

    // Movement
    if (this.moveTimer > 0) {
      this.moveTimer--;
      return;
    }
    let dx = 0, dy = 0;
    // Check for direction input (once for single step, repeat for held keys)
    if (isDirOnce('up')) { dy = -1; this.moveRepeat = 0; }
    else if (isDirOnce('down')) { dy = 1; this.moveRepeat = 0; }
    else if (isDirOnce('left')) { dx = -1; this.moveRepeat = 0; }
    else if (isDirOnce('right')) { dx = 1; this.moveRepeat = 0; }
    else if (this.moveRepeat > 0) {
      this.moveRepeat--;
    } else {
      // Key held - move with repeat delay
      if (isDir('up')) { dy = -1; this.moveRepeat = 0; }
      else if (isDir('down')) { dy = 1; this.moveRepeat = 0; }
      else if (isDir('left')) { dx = -1; this.moveRepeat = 0; }
      else if (isDir('right')) { dx = 1; this.moveRepeat = 0; }
    }

    if (dx || dy) {
      const nx = this.player.x + dx, ny = this.player.y + dy;
      // Check for boss blocking
      const m = this.currentMap();
      if (m.boss && nx === m.boss.x && ny === m.boss.y && !this.player.flags.bossDefeated) {
        sfx('encounter');
        this.startBattle(m.boss.monsterId, true);
        return;
      }
      // Check for mid-boss blocking
      if (m.midBoss && nx === m.midBoss.x && ny === m.midBoss.y && !this.player.flags[m.midBoss.flag]) {
        sfx('encounter');
        this.startBattle(m.midBoss.monsterId, false, m.midBoss.flag);
        return;
      }
      if (this.isWalkable(nx, ny)) {
        this.player.x = nx;
        this.player.y = ny;
        this.moveTimer = MOVE_DELAY;
        this.moveRepeat = 10;
        sfx('step');
        this.onStep();
      } else {
        this.moveTimer = 4;
      }
    }
  }

  handleFieldAction() {
    // Check for NPC in front (just check all adjacent for simplicity)
    const p = this.player;
    const m = this.currentMap();
    const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
    for (const [dx, dy] of dirs) {
      const npc = this.getNpcAt(p.x + dx, p.y + dy);
      if (npc) {
        sfx('confirm');
        if (npc.shop) {
          this.openShop(npc.shop);
          return;
        }
        if (npc.event === 'kingQuest' && !p.flags.gotQuest) {
          p.flags.gotQuest = true;
        }
        // Get dialog - dynamic or static
        const dlg = npc.dialogFn
          ? getNpcDialog(npc.npcId, p.flags, p.level)
          : npc.dialog;
        this.showMessage(dlg);
        return;
      }
    }

    // Check for mid-boss blocking
    if (m.midBoss && !p.flags[m.midBoss.flag]) {
      const mb = m.midBoss;
      for (const [dx, dy] of dirs) {
        if (p.x + dx === mb.x && p.y + dy === mb.y) {
          sfx('encounter');
          this.startBattle(mb.monsterId, false, mb.flag);
          return;
        }
      }
    }

    // Check for chest at current position
    const chest = this.getChestAt(p.x, p.y);
    if (chest && !this.isChestOpen(this.mapId, p.x, p.y)) {
      sfx('open');
      this.openChest(this.mapId, p.x, p.y);
      const item = chest.item;
      // Try to look up in items, weapons, armors, shields
      let itemName = item;
      if (ITEMS[item]) { p.items.push(item); itemName = ITEMS[item].name; }
      else if (WEAPONS[item]) { p.weapon = item; itemName = WEAPONS[item].name; }
      else if (ARMORS[item]) { p.armor = item; itemName = ARMORS[item].name; }
      else if (SHIELDS[item]) { p.shield = item; itemName = SHIELDS[item].name; }
      this.showMessage([`たからばこをあけた！\n${itemName}を てにいれた！`]);
      return;
    }

    // Check for inn
    if (m.inn) {
      const innDist = Math.abs(p.x - m.inn.x) + Math.abs(p.y - m.inn.y);
      if (innDist <= 1) {
        sfx('confirm');
        this.state = 'inn';
        this.menuIdx = 0;
        return;
      }
    }
  }

  onStep() {
    const p = this.player;
    // Map transitions on world map
    if (this.mapId === 'world') {
      const loc = WORLD_LOCATIONS.find(l => l.x === p.x && l.y === p.y);
      if (loc) {
        p.lastTown = loc.map;
        this.transitionMap(loc.map, loc.tx, loc.ty);
        return;
      }
    }
    // Indoor exit tiles
    const m = this.currentMap();
    if (m.exits) {
      const ex = m.exits.find(e => e.x === p.x && e.y === p.y);
      if (ex) {
        this.transitionMap(ex.map, ex.tx, ex.ty);
        return;
      }
    }
    // Random encounters
    if (m.encounterRate > 0) {
      const table = this.getEncounterTable();
      if (table && Math.random() < m.encounterRate) {
        const mid = table[Math.floor(Math.random() * table.length)];
        sfx('encounter');
        this.startBattle(mid, false);
      }
    }
    // Swamp damage
    if (this.mapId === 'world' && this.getTile(p.x, p.y) === 9) {
      p.hp = Math.max(1, p.hp - 1);
    }
  }

  transitionMap(mapId, tx, ty) {
    this.fadeDir = 1;
    this.fade = 0;
    this.fadeCb = () => {
      this.mapId = mapId;
      this.player.x = tx;
      this.player.y = ty;
      // Switch BGM based on map
      if (mapId === 'startTown' || mapId === 'lakeTown' || mapId === 'portTown') {
        if (BGM.playing !== 'town') BGM.play('town');
      } else {
        if (BGM.playing !== 'field') BGM.play('field');
      }
      this.fadeDir = -1;
      this.fadeCb = () => { this.fadeDir = 0; };
    };
  }

  renderField() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, SW, SH);
    this.drawMap();
    this.drawStatusBar();
  }

  // --- State: Battle ---
  startBattle(monsterId, isBoss, midBossFlag) {
    const md = MONSTERS[monsterId];
    BGM.play(isBoss || md.boss ? 'boss' : 'battle');
    this.battle = {
      monster: { ...md, currentHp: md.hp },
      monsterId,
      phase: 'encounter',
      cmdIdx: 0,
      msg: `${md.name}が あらわれた！`,
      msgQueue: [],
      timer: 60,
      spellIdx: 0,
      itemIdx: 0,
      isBoss,
      midBossFlag: midBossFlag || null,
    };
    this.state = 'battle';
  }

  updateBattle() {
    const b = this.battle;
    switch (b.phase) {
      case 'encounter':
        if (b.timer > 0) { b.timer--; return; }
        if (isA()) { b.phase = 'command'; b.cmdIdx = 0; }
        break;
      case 'command':
        if (isDirOnce('up')) { sfx('cursor'); b.cmdIdx = (b.cmdIdx + 3) % 4; }
        if (isDirOnce('down')) { sfx('cursor'); b.cmdIdx = (b.cmdIdx + 1) % 4; }
        if (isA()) {
          sfx('confirm');
          if (b.cmdIdx === 0) this.battleAttack();
          else if (b.cmdIdx === 1) this.battleSpellSelect();
          else if (b.cmdIdx === 2) this.battleItemSelect();
          else if (b.cmdIdx === 3) this.battleRun();
        }
        break;
      case 'spellSelect':
        if (isB()) { sfx('cancel'); b.phase = 'command'; return; }
        if (isDirOnce('up')) { sfx('cursor'); b.spellIdx = Math.max(0, b.spellIdx - 1); }
        if (isDirOnce('down')) { sfx('cursor'); b.spellIdx = Math.min(this.player.spells.length - 1, b.spellIdx + 1); }
        if (isA() && this.player.spells.length > 0) {
          sfx('confirm');
          this.battleCastSpell(this.player.spells[b.spellIdx]);
        }
        break;
      case 'itemSelect':
        if (isB()) { sfx('cancel'); b.phase = 'command'; return; }
        if (isDirOnce('up')) { sfx('cursor'); b.itemIdx = Math.max(0, b.itemIdx - 1); }
        if (isDirOnce('down')) { sfx('cursor'); b.itemIdx = Math.min(this.player.items.length - 1, b.itemIdx + 1); }
        if (isA() && this.player.items.length > 0) {
          sfx('confirm');
          this.battleUseItem(b.itemIdx);
        }
        break;
      case 'playerAct':
      case 'enemyAct':
        if (b.timer > 0) { b.timer--; return; }
        if (isA()) {
          if (b.msgQueue.length > 0) {
            b.msg = b.msgQueue.shift();
            b.timer = 20;
          } else {
            if (b.phase === 'playerAct') {
              if (b.monster.currentHp <= 0) { this.battleVictory(); }
              else { this.battleEnemyTurn(); }
            } else {
              if (this.player.hp <= 0) { this.battleDefeat(); }
              else { b.phase = 'command'; b.cmdIdx = 0; }
            }
          }
        }
        break;
      case 'victory':
        if (b.timer > 0) { b.timer--; return; }
        if (isA()) {
          if (b.msgQueue.length > 0) {
            b.msg = b.msgQueue.shift();
            b.timer = 15;
          } else {
            if (b.isBoss) {
              if (b.monsterId === 'demonLord' && !this.player.flags.bossDefeated) {
                // Phase 2: zomt appears!
                this.player.flags.bossDefeated = true;
                // Learn Roucon
                if (!this.player.spells.includes('roucon')) {
                  this.player.spells.push('roucon');
                }
                this.battle.msg = 'まおうの からだから\nおそろしい ちからが あふれだす…！';
                this.battle.msgQueue = [
                  'ゆうしゃの こころに\nふういんの じゅもんが\nひびきわたる…！',
                  'ロウチョンの じゅもんを\nおぼえた！',
                  'しんの すがたが あらわれた！',
                ];
                this.battle.phase = 'zomtTransition';
                this.battle.timer = 40;
                return;
              }
              if (b.monsterId === 'zomt') {
                this.player.flags.zomtDefeated = true;
                BGM.stop();
                this.state = 'ending';
                this.ending = true;
                this.endingPhase = 0;
                this.endingTimer = 0;
                return;
              }
              // Other bosses with sealOnly beaten by seal
              if (b.monster.sealOnly) {
                BGM.play('field');
                this.state = 'field';
                return;
              }
            }
            BGM.play('field');
            this.state = 'field';
          }
        }
        break;
      case 'zomtTransition':
        if (b.timer > 0) { b.timer--; return; }
        if (isA()) {
          if (b.msgQueue.length > 0) {
            b.msg = b.msgQueue.shift();
            b.timer = 20;
          } else {
            // Start zomt battle
            const md = MONSTERS.zomt;
            this.battle = {
              monster: { ...md, currentHp: md.hp },
              monsterId: 'zomt',
              phase: 'encounter',
              cmdIdx: 0,
              msg: `${md.name}が あらわれた！`,
              msgQueue: ['このてきには ふつうの\nこうげきは きかない…！','ロウチョンの じゅもんで\nふういんするのだ！'],
              timer: 60,
              spellIdx: 0,
              itemIdx: 0,
              isBoss: true,
              sealCount: 0,
              sealMax: md.sealMax || 8,
            };
            BGM.play('zomt');
            sfx('encounter');
          }
        }
        break;
      case 'defeat':
        if (isA()) {
          // Revive at last town with half gold
          this.player.hp = this.player.maxHp;
          this.player.mp = this.player.maxMp;
          this.player.gold = Math.floor(this.player.gold / 2);
          const loc = WORLD_LOCATIONS.find(l => l.map === this.player.lastTown) || WORLD_LOCATIONS[0];
          this.mapId = 'world';
          this.player.x = loc.x;
          this.player.y = loc.y;
          BGM.play('field');
          this.state = 'field';
        }
        break;
      case 'run':
        if (isA()) {
          if (b.runSuccess) { BGM.play('field'); this.state = 'field'; }
          else { b.phase = 'enemyAct'; this.battleEnemyTurn(); }
        }
        break;
    }
  }

  battleAttack() {
    const p = this.player, b = this.battle, m = b.monster;
    // Zomt is immune to normal attacks
    if (m.sealOnly) {
      sfx('miss');
      b.msg = `ゆうしゃの こうげき！\nしかし ${m.name}には\nきかなかった…！`;
      b.msgQueue = [];
      b.phase = 'playerAct'; b.timer = 30;
      return;
    }
    const pAtk = p.atk + (p.weapon ? WEAPONS[p.weapon].atk : 0);
    let dmg = Math.max(1, Math.floor(pAtk - m.def / 2 + (Math.random() * 5 - 2)));
    m.currentHp -= dmg;
    sfx('hit');
    b.msg = `ゆうしゃの こうげき！\n${m.name}に ${dmg}の ダメージ！`;
    b.msgQueue = [];
    if (m.currentHp <= 0) {
      m.currentHp = 0;
      b.msgQueue.push(`${m.name}を たおした！`);
    }
    b.phase = 'playerAct';
    b.timer = 30;
  }

  battleSpellSelect() {
    if (this.player.spells.length === 0) {
      this.battle.msg = 'じゅもんを おぼえていない！';
      this.battle.phase = 'playerAct';
      this.battle.msgQueue = [];
      this.battle.timer = 30;
      return;
    }
    this.battle.phase = 'spellSelect';
    this.battle.spellIdx = 0;
  }

  battleCastSpell(spellId) {
    const p = this.player, b = this.battle, sp = SPELLS[spellId], m = b.monster;
    if (p.mp < sp.mp) {
      b.msg = 'MPが たりない！';
      b.phase = 'playerAct'; b.msgQueue = []; b.timer = 30;
      return;
    }
    p.mp -= sp.mp;
    b.msgQueue = [];
    if (sp.type === 'heal') {
      const heal = Math.min(sp.value, p.maxHp - p.hp);
      p.hp += heal;
      sfx('heal');
      b.msg = `ゆうしゃは ${sp.name}を となえた！\nHPが ${heal} かいふくした！`;
    } else if (sp.type === 'attack') {
      // Zomt is immune to normal attack spells
      if (m.sealOnly) {
        sfx('miss');
        b.msg = `ゆうしゃは ${sp.name}を となえた！\nしかし ${m.name}には\nきかなかった…！`;
      } else {
        const v = sp.variance || 0;
        const dmg = Math.max(1, sp.value + Math.floor(Math.random() * v) - Math.floor(m.def / 4));
        m.currentHp -= dmg;
        sfx('hit');
        b.msg = `ゆうしゃは ${sp.name}を となえた！\n${m.name}に ${dmg}の ダメージ！`;
        if (m.currentHp <= 0) { m.currentHp = 0; b.msgQueue.push(`${m.name}を たおした！`); }
      }
    } else if (sp.type === 'seal') {
      // Roucon - seal spell, only effective on sealOnly enemies
      if (!m.sealOnly) {
        sfx('miss');
        b.msg = `ゆうしゃは ${sp.name}を となえた！\nしかし なにも おこらなかった…`;
      } else {
        b.sealCount = (b.sealCount || 0) + 1;
        sfx('hit');
        const remaining = b.sealMax - b.sealCount;
        if (remaining <= 0) {
          m.currentHp = 0;
          b.msg = `ゆうしゃは ${sp.name}を となえた！\nふういんの ちからが\n${m.name}を つつみこむ…！`;
          b.msgQueue.push(`${m.name}は ゾムトくうかんに\nふういん された！`);
        } else if (remaining <= 2) {
          b.msg = `ゆうしゃは ${sp.name}を となえた！\nふういんの ちからが\nつよまっていく…！`;
          b.msgQueue.push('もうすこしで ふういん\nできそうだ…！');
        } else if (b.sealCount === 1) {
          b.msg = `ゆうしゃは ${sp.name}を となえた！\nふういんの ひかりが\n${m.name}を つらぬく！`;
          b.msgQueue.push('ロウチョンを となえつづけて\nふういんするのだ！');
        } else {
          const messages = [
            `ゆうしゃは ${sp.name}を となえた！\nふういんの ちからが\nすこしずつ きいてくる…！`,
            `ゆうしゃは ${sp.name}を となえた！\n${m.name}の うごきが\nにぶくなってきた…！`,
            `ゆうしゃは ${sp.name}を となえた！\nやみの ちからが\nよわまっていく…！`,
          ];
          b.msg = messages[(b.sealCount - 2) % messages.length];
        }
      }
    } else {
      b.msg = 'せんとうちゅうは つかえない！';
    }
    b.phase = 'playerAct'; b.timer = 30;
  }

  battleItemSelect() {
    if (this.player.items.length === 0) {
      this.battle.msg = 'どうぐを もっていない！';
      this.battle.phase = 'playerAct';
      this.battle.msgQueue = [];
      this.battle.timer = 30;
      return;
    }
    this.battle.phase = 'itemSelect';
    this.battle.itemIdx = 0;
  }

  battleUseItem(idx) {
    const p = this.player, b = this.battle;
    const itemId = p.items[idx];
    const item = ITEMS[itemId];
    if (!item) return;
    if (item.type === 'heal') {
      const heal = Math.min(item.value, p.maxHp - p.hp);
      p.hp += heal;
      p.items.splice(idx, 1);
      sfx('heal');
      b.msg = `${item.name}を つかった！\nHPが ${heal} かいふくした！`;
    } else if (item.type === 'mpHeal') {
      const heal = Math.min(item.value, p.maxMp - p.mp);
      p.mp += heal;
      p.items.splice(idx, 1);
      sfx('heal');
      b.msg = `${item.name}を つかった！\nMPが ${heal} かいふくした！`;
    } else {
      b.msg = 'せんとうちゅうは つかえない！';
    }
    b.phase = 'playerAct'; b.msgQueue = []; b.timer = 30;
  }

  battleRun() {
    const b = this.battle, m = b.monster;
    if (b.isBoss) {
      b.msg = 'まおうからは にげられない！';
      b.phase = 'run'; b.runSuccess = false;
      return;
    }
    const chance = 0.5 + (this.player.spd - m.spd) * 0.05;
    if (Math.random() < chance) {
      sfx('cancel');
      b.msg = 'うまく にげきれた！';
      b.phase = 'run'; b.runSuccess = true;
    } else {
      sfx('miss');
      b.msg = 'にげられなかった！';
      b.phase = 'run'; b.runSuccess = false;
    }
  }

  battleEnemyTurn() {
    const p = this.player, b = this.battle, m = b.monster;
    const pDef = p.def + (p.armor ? ARMORS[p.armor].def : 0) + (p.shield ? SHIELDS[p.shield].def : 0);

    // Enemy magic
    const magicRate = m.boss ? 0.5 : 0.3;
    if (m.magic && Math.random() < magicRate) {
      const dmg = Math.max(1, Math.floor(m.atk * 0.8 + Math.random() * 5));
      p.hp -= dmg;
      sfx('damage');
      b.msg = `${m.name}は じゅもんを となえた！\nゆうしゃに ${dmg}の ダメージ！`;
    } else {
      let dmg = Math.max(0, Math.floor(m.atk - pDef / 2 + (Math.random() * 5 - 2)));
      if (dmg <= 0) { dmg = 0; sfx('miss'); b.msg = `${m.name}の こうげき！\nゆうしゃは ダメージを うけなかった！`; }
      else { p.hp -= dmg; sfx('damage'); b.msg = `${m.name}の こうげき！\nゆうしゃに ${dmg}の ダメージ！`; }
    }
    if (p.hp <= 0) { p.hp = 0; b.msgQueue = ['ゆうしゃは たおれた…']; }
    else { b.msgQueue = []; }
    b.phase = 'enemyAct'; b.timer = 30;
  }

  battleVictory() {
    const p = this.player, b = this.battle, md = MONSTERS[b.monsterId];
    sfx('victory');
    b.msg = `${md.name}を やっつけた！`;
    b.msgQueue = [];
    if (md.exp > 0) b.msgQueue.push(`${md.exp}の けいけんちを えた！\n${md.gold}ゴールドを てにいれた！`);
    p.exp += md.exp;
    p.gold += md.gold;
    // Mid-boss flag and rewards
    if (b.midBossFlag) {
      p.flags[b.midBossFlag] = true;
      if (b.midBossFlag === 'caveBossDefeated') {
        // Learn ultimate spell
        if (!p.spells.includes('ultima')) {
          p.spells.push('ultima');
          b.msgQueue.push('ばんにんの ちからが\nゆうしゃに ながれこむ…！');
          b.msgQueue.push('アルテマの じゅもんを\nおぼえた！');
        }
      }
      if (b.midBossFlag === 'castleMidBossDefeated') {
        b.msgQueue.push('まおうの ぶかを たおした！');
        b.msgQueue.push('おくの たからばこに\nちかづけるように なった！');
      }
    }
    // Level up check
    const lvlMsgs = this.checkLevelUp();
    lvlMsgs.forEach(m => b.msgQueue.push(m));
    b.phase = 'victory'; b.timer = 20;
  }

  battleDefeat() {
    this.battle.phase = 'defeat';
    this.battle.msg = 'ゆうしゃは ちからつきた…\nもちゴールドの はんぶんを\nうしなってしまった…';
  }

  checkLevelUp() {
    const p = this.player, msgs = [];
    while (p.level < 20) {
      const next = LEVEL_TABLE[p.level]; // next level data
      if (!next || p.exp < next[0]) break;
      p.level++;
      const s = LEVEL_TABLE[p.level - 1];
      const oldHp = p.maxHp, oldMp = p.maxMp;
      p.maxHp = s[1]; p.maxMp = s[2]; p.atk = s[3]; p.def = s[4]; p.spd = s[5];
      p.hp = p.maxHp; p.mp = p.maxMp;
      sfx('levelup');
      msgs.push(`レベルが ${p.level}に あがった！\nちからが つよくなった！`);
      // Learn spells
      for (const [id, sp] of Object.entries(SPELLS)) {
        if (sp.learnLv === p.level && !p.spells.includes(id)) {
          p.spells.push(id);
          msgs.push(`${sp.name}の じゅもんを おぼえた！`);
        }
      }
    }
    return msgs;
  }

  renderBattle() {
    const b = this.battle;
    // Background
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, SW, SH);

    // Monster sprite
    if (b.monster.currentHp > 0) {
      const ms = MONSTER_SPRITES[b.monster.sprite];
      if (ms && ms.draw) {
        ms.draw(this.ctx, SW/2-48, 20, 96, 96);
      }
    }

    // Monster name & HP
    this.drawWindow(0, 0, SW, 20);
    if (b.monster.sealOnly) {
      const sealPct = Math.min(100, Math.floor((b.sealCount || 0) / (b.sealMax || 8) * 100));
      this.drawText(`${b.monster.name}  ふういん:${sealPct}%`, 8, 4, '#FFF', 10);
    } else {
      this.drawText(`${b.monster.name}  HP:${b.monster.currentHp}/${MONSTERS[b.monsterId].hp}`, 8, 4, '#FFF', 10);
    }

    // Message window
    this.drawWindow(0, 120, SW, 62);
    const lines = b.msg.split('\n');
    lines.forEach((l, i) => this.drawText(l, 10, 128 + i * 15));

    // Command / sub-menu
    if (b.phase === 'command') {
      this.drawWindow(0, 182, 130, 58);
      const cmds = ['たたかう','じゅもん','どうぐ','にげる'];
      cmds.forEach((c, i) => {
        this.drawText(c, 24, 188 + i * 13, i === b.cmdIdx ? '#FFDD33' : '#FFF', 10);
      });
      this.drawText('▶', 10, 188 + b.cmdIdx * 13, '#FFDD33', 10);
    }

    if (b.phase === 'spellSelect') {
      this.drawWindow(0, 182, 200, 58);
      const spells = this.player.spells;
      const spStart = Math.max(0, b.spellIdx - 3);
      spells.slice(spStart, spStart + 4).forEach((sid, i) => {
        const sp = SPELLS[sid];
        const idx = spStart + i;
        this.drawText(`${sp.name} MP${sp.mp}`, 24, 188 + i * 13, idx === b.spellIdx ? '#FFDD33' : '#FFF', 10);
      });
      if (spells.length > 0) this.drawText('▶', 10, 188 + (b.spellIdx - spStart) * 13, '#FFDD33', 10);
    }

    if (b.phase === 'itemSelect') {
      this.drawWindow(0, 182, 200, 58);
      const items = this.player.items;
      const start = Math.max(0, b.itemIdx - 3);
      items.slice(start, start + 4).forEach((iid, i) => {
        const it = ITEMS[iid];
        const idx = start + i;
        this.drawText(it ? it.name : iid, 24, 188 + i * 13, idx === b.itemIdx ? '#FFDD33' : '#FFF', 10);
      });
      if (items.length > 0) this.drawText('▶', 10, 188 + (b.itemIdx - start) * 13, '#FFDD33', 10);
    }

    // Player status
    this.drawWindow(140, 182, 116, 58);
    const p = this.player;
    this.drawText(`Lv${p.level}`, 148, 188, '#FFF', 10);
    this.drawText(`HP ${p.hp}/${p.maxHp}`, 148, 202, p.hp < p.maxHp * 0.3 ? '#FF4444' : '#FFF', 10);
    this.drawText(`MP ${p.mp}/${p.maxMp}`, 148, 216, '#FFF', 10);
  }

  // --- State: Menu ---
  updateMenu() {
    if (isB() && !this.menuSub) { sfx('cancel'); this.state = 'field'; return; }
    if (!this.menuSub) {
      if (isDirOnce('up')) { sfx('cursor'); this.menuIdx = (this.menuIdx + 7) % 8; }
      if (isDirOnce('down')) { sfx('cursor'); this.menuIdx = (this.menuIdx + 1) % 8; }
      if (isA()) {
        sfx('confirm');
        switch(this.menuIdx) {
          case 0: this.menuSub = 'status'; break;
          case 1: this.menuSub = 'spells'; this.menuSubIdx = 0; break;
          case 2: this.menuSub = 'items'; this.menuSubIdx = 0; break;
          case 3: this.menuSub = 'equip'; this.menuSubIdx = 0; break;
          case 4: this.saveGame(); break;
          case 5:
            soundEnabled = !soundEnabled;
            localStorage.setItem('yuusha_sound', soundEnabled ? 'on' : 'off');
            if (!soundEnabled) { BGM.stop(); }
            else if (this.state === 'menu') {
              const bgmMap = { world:'field', town1:'town', town2:'town', town3:'town', castle_interior:'town' };
              const songId = bgmMap[this.mapId] || 'field';
              BGM.play(songId);
            }
            break;
          case 6: sfx('cancel'); this.state = 'field'; break;
          case 7:
            this.confirmMsg = 'タイトルに もどりますか？';
            this.confirmIdx = 1;
            this.confirmCb = () => { BGM.stop(); this.state = 'title'; this.menuIdx = 0; };
            this.state = 'confirm';
            break;
        }
      }
    } else {
      if (isB()) { sfx('cancel'); this.menuSub = null; return; }
      this.updateMenuSub();
    }
  }

  updateMenuSub() {
    const p = this.player;
    if (this.menuSub === 'items') {
      if (p.items.length === 0) return; // stay open, show empty message
      if (isDirOnce('up')) { sfx('cursor'); this.menuSubIdx = Math.max(0, this.menuSubIdx - 1); }
      if (isDirOnce('down')) { sfx('cursor'); this.menuSubIdx = Math.min(p.items.length - 1, this.menuSubIdx + 1); }
      if (isA()) {
        const item = ITEMS[p.items[this.menuSubIdx]];
        if (item && item.type === 'heal') {
          const heal = Math.min(item.value, p.maxHp - p.hp);
          p.hp += heal;
          p.items.splice(this.menuSubIdx, 1);
          sfx('heal');
          this.showMessage([`${item.name}を つかった！\nHPが ${heal} かいふくした！`], () => {
            this.state = 'menu'; this.menuSub = 'items';
            this.menuSubIdx = Math.min(this.menuSubIdx, p.items.length - 1);
          });
        } else if (item && item.type === 'mpHeal') {
          const heal = Math.min(item.value, p.maxMp - p.mp);
          p.mp += heal;
          p.items.splice(this.menuSubIdx, 1);
          sfx('heal');
          this.showMessage([`${item.name}を つかった！\nMPが ${heal} かいふくした！`], () => {
            this.state = 'menu'; this.menuSub = 'items';
            this.menuSubIdx = Math.min(this.menuSubIdx, p.items.length - 1);
          });
        } else if (item && item.type === 'warp') {
          p.items.splice(this.menuSubIdx, 1);
          this.warpToTown();
        }
      }
    } else if (this.menuSub === 'spells') {
      if (p.spells.length === 0) return; // stay open, show empty message
      if (isDirOnce('up')) { sfx('cursor'); this.menuSubIdx = Math.max(0, this.menuSubIdx - 1); }
      if (isDirOnce('down')) { sfx('cursor'); this.menuSubIdx = Math.min(p.spells.length - 1, this.menuSubIdx + 1); }
      if (isA()) {
        const sp = SPELLS[p.spells[this.menuSubIdx]];
        if (sp.type === 'heal') {
          if (p.mp >= sp.mp) {
            p.mp -= sp.mp;
            const heal = Math.min(sp.value, p.maxHp - p.hp);
            p.hp += heal;
            sfx('heal');
            this.showMessage([`${sp.name}を となえた！\nHPが ${heal} かいふくした！`], () => { this.state = 'menu'; this.menuSub = 'spells'; });
          } else {
            sfx('cancel');
          }
        } else if (sp.type === 'field') {
          if (p.mp >= sp.mp) {
            p.mp -= sp.mp;
            if (sp === SPELLS.warp) this.warpToTown();
            else if (sp === SPELLS.escape) this.escapeFromDungeon();
          } else { sfx('cancel'); }
        }
      }
    } else if (this.menuSub === 'equip') {
      // Simple equip display, no changes from menu for now
    }
  }

  useFieldSpell(id) {
    // Handled through spell menu
  }

  warpToTown() {
    const loc = WORLD_LOCATIONS.find(l => l.map === this.player.lastTown) || WORLD_LOCATIONS[0];
    sfx('confirm');
    this.state = 'field';
    this.menuSub = null;
    this.transitionMap('world', loc.x, loc.y);
  }

  escapeFromDungeon() {
    if (this.mapId === 'world' || this.currentMap().encounterRate === 0) {
      sfx('cancel');
      return;
    }
    const m = this.currentMap();
    if (m.exits && m.exits.length > 0) {
      const ex = m.exits[0];
      sfx('confirm');
      this.state = 'field';
      this.menuSub = null;
      this.transitionMap(ex.map, ex.tx, ex.ty);
    }
  }

  renderMenu() {
    this.renderField();
    // Main menu window
    this.drawWindow(8, 8, 100, 144);
    const items = ['つよさ','じゅもん','どうぐ','そうび','セーブ','おと','とじる','タイトル'];
    items.forEach((it, i) => {
      let label = it;
      if (i === 5) label = soundEnabled ? 'おと：ON' : 'おと：OFF';
      this.drawText(label, 30, 16 + i * 16, i === this.menuIdx ? '#FFDD33' : '#FFF', 11);
    });
    this.drawText('▶', 16, 16 + this.menuIdx * 16, '#FFDD33', 11);

    if (this.menuSub === 'status') this.renderStatusSub();
    else if (this.menuSub === 'items') this.renderItemsSub();
    else if (this.menuSub === 'spells') this.renderSpellsSub();
    else if (this.menuSub === 'equip') this.renderEquipSub();
  }

  renderStatusSub() {
    const p = this.player;
    this.drawWindow(112, 8, 138, 160);
    this.drawText('【 つよさ 】', 120, 14, '#FFDD33', 11);
    const totalAtk = p.atk + (p.weapon ? WEAPONS[p.weapon].atk : 0);
    const totalDef = p.def + (p.armor ? ARMORS[p.armor].def : 0) + (p.shield ? SHIELDS[p.shield].def : 0);
    const lines = [
      `Lv  ${p.level}`, `HP  ${p.hp}/${p.maxHp}`, `MP  ${p.mp}/${p.maxMp}`,
      `こうげき  ${totalAtk}`, `ぼうぎょ  ${totalDef}`, `すばやさ  ${p.spd}`,
      `EXP ${p.exp}`, `つぎ ${this.getNextExp()}`,
      `G   ${p.gold}`,
    ];
    lines.forEach((l, i) => this.drawText(l, 120, 30 + i * 14, '#FFF', 10));
  }

  getNextExp() {
    if (this.player.level >= 20) return '---';
    return LEVEL_TABLE[this.player.level][0] - this.player.exp;
  }

  renderItemsSub() {
    const p = this.player;
    this.drawWindow(112, 8, 138, 160);
    this.drawText('【 どうぐ 】', 120, 14, '#FFDD33', 11);
    if (p.items.length === 0) { this.drawText('なにも もっていない', 120, 34, '#999', 10); return; }
    const start = Math.max(0, this.menuSubIdx - 8);
    p.items.slice(start, start + 9).forEach((iid, i) => {
      const it = ITEMS[iid];
      const idx = start + i;
      this.drawText(it ? it.name : iid, 136, 30 + i * 14, idx === this.menuSubIdx ? '#FFDD33' : '#FFF', 10);
    });
    this.drawText('▶', 122, 30 + (this.menuSubIdx - start) * 14, '#FFDD33', 10);
  }

  renderSpellsSub() {
    const p = this.player;
    this.drawWindow(112, 8, 138, 160);
    this.drawText('【 じゅもん 】', 120, 14, '#FFDD33', 11);
    if (p.spells.length === 0) { this.drawText('おぼえていない', 120, 34, '#999', 10); return; }
    p.spells.forEach((sid, i) => {
      const sp = SPELLS[sid];
      this.drawText(`${sp.name} ${sp.mp}MP`, 136, 30 + i * 14, i === this.menuSubIdx ? '#FFDD33' : '#FFF', 10);
    });
    this.drawText('▶', 122, 30 + this.menuSubIdx * 14, '#FFDD33', 10);
  }

  renderEquipSub() {
    const p = this.player;
    this.drawWindow(112, 8, 138, 120);
    this.drawText('【 そうび 】', 120, 14, '#FFDD33', 11);
    this.drawText(`ぶき: ${p.weapon ? WEAPONS[p.weapon].name : 'なし'}`, 120, 34, '#FFF', 10);
    this.drawText(`よろい: ${p.armor ? ARMORS[p.armor].name : 'なし'}`, 120, 50, '#FFF', 10);
    this.drawText(`たて: ${p.shield ? SHIELDS[p.shield].name : 'なし'}`, 120, 66, '#FFF', 10);
  }

  // --- State: Dialog ---
  showMessage(msgs, cb) {
    if (typeof msgs === 'string') msgs = [msgs];
    this.msg = msgs;
    this.msgIdx = 0;
    this.msgCb = cb;
    this.state = 'dialog';
  }

  updateDialog() {
    if (isA()) {
      sfx('confirm');
      this.msgIdx++;
      if (this.msgIdx >= this.msg.length) {
        this.state = 'field';
        if (this.msgCb) { this.msgCb(); this.msgCb = null; }
      }
    }
  }

  wrapText(str, maxWidth, fontSize) {
    const lines = [];
    for (const raw of str.split('\n')) {
      let line = '';
      for (const ch of raw) {
        const test = line + ch;
        this.ctx.font = `bold ${fontSize}px monospace, "MS Gothic", sans-serif`;
        if (this.ctx.measureText(test).width > maxWidth) {
          lines.push(line);
          line = ch;
        } else {
          line = test;
        }
      }
      lines.push(line);
    }
    return lines;
  }

  renderDialog() {
    this.renderField();
    const text = this.msg[this.msgIdx] || '';
    const maxW = SW - 40;
    const wrapped = this.wrapText(text, maxW, 11);
    const boxH = Math.max(52, wrapped.length * 16 + 16);
    this.drawWindow(8, STATUS_Y - boxH - 4, SW - 16, boxH);
    wrapped.forEach((l, i) => this.drawText(l, 18, STATUS_Y - boxH + 4 + i * 16, '#FFF', 11));
    if (this.frame % 40 < 25) this.drawText('▼', SW - 28, STATUS_Y - 12, '#FFDD33', 10);
  }

  // --- State: Shop ---
  openShop(shopId) {
    const shop = SHOPS[shopId];
    if (!shop) return;
    this.shop = { ...shop, idx: 0 };
    this.state = 'shop';
  }

  updateShop() {
    const s = this.shop, p = this.player;
    if (isB()) { sfx('cancel'); this.state = 'field'; return; }
    if (isDirOnce('up')) { sfx('cursor'); s.idx = Math.max(0, s.idx - 1); }
    if (isDirOnce('down')) { sfx('cursor'); s.idx = Math.min(s.items.length - 1, s.idx + 1); }
    if (isA()) {
      const itemId = s.items[s.idx];
      let item, price;
      if (s.type === 'weapon') { item = WEAPONS[itemId]; price = item.price; }
      else if (s.type === 'item') { item = ITEMS[itemId]; price = item ? item.price : 0; }
      else {
        item = ARMORS[itemId] || SHIELDS[itemId];
        price = item ? item.price : 0;
      }
      if (!item) return;
      if (p.gold >= price) {
        p.gold -= price;
        sfx('confirm');
        if (s.type === 'weapon') {
          p.weapon = itemId;
          this.showMessage([`${item.name}を そうびした！`], () => { this.state = 'shop'; });
        } else if (s.type === 'item') {
          p.items.push(itemId);
          this.showMessage([`${item.name}を かった！`], () => { this.state = 'shop'; });
        } else {
          if (ARMORS[itemId]) { p.armor = itemId; }
          else if (SHIELDS[itemId]) { p.shield = itemId; }
          this.showMessage([`${item.name}を そうびした！`], () => { this.state = 'shop'; });
        }
      } else {
        sfx('cancel');
        this.showMessage(['おかねが たりないよ！'], () => { this.state = 'shop'; });
      }
    }
  }

  renderShop() {
    this.renderField();
    const s = this.shop;
    this.drawWindow(8, 8, 240, 16 + s.items.length * 18);
    const shopTitle = s.type === 'weapon' ? '【 ぶきや 】' : s.type === 'item' ? '【 どうぐや 】' : '【 ぼうぐや 】';
    this.drawText(shopTitle, 16, 12, '#FFDD33', 11);
    s.items.forEach((iid, i) => {
      let item;
      if (s.type === 'weapon') item = WEAPONS[iid];
      else if (s.type === 'item') item = ITEMS[iid];
      else item = ARMORS[iid] || SHIELDS[iid];
      if (!item) return;
      const sel = i === s.idx;
      this.drawText(`${item.name}`, 36, 28 + i * 18, sel ? '#FFDD33' : '#FFF', 10);
      this.drawText(`${item.price}G`, 170, 28 + i * 18, sel ? '#FFDD33' : '#FFF', 10);
      if (s.type === 'weapon') this.drawText(`ATK+${item.atk}`, 210, 28 + i * 18, '#AAF', 9);
      else if (s.type !== 'item') this.drawText(`DEF+${item.def}`, 210, 28 + i * 18, '#AAF', 9);
    });
    this.drawText('▶', 22, 28 + s.idx * 18, '#FFDD33', 10);
    this.drawWindow(8, STATUS_Y - 24, 100, 20);
    this.drawText(`G: ${this.player.gold}`, 16, STATUS_Y - 20, '#FFF', 10);
  }

  // --- State: Inn ---
  updateInn() {
    const m = this.currentMap(), p = this.player;
    if (isDirOnce('up') || isDirOnce('down')) { sfx('cursor'); this.menuIdx = this.menuIdx === 0 ? 1 : 0; }
    if (isA()) {
      if (this.menuIdx === 0) {
        if (p.gold >= m.inn.price) {
          p.gold -= m.inn.price;
          p.hp = p.maxHp;
          p.mp = p.maxMp;
          sfx('heal');
          this.showMessage(['おやすみなさい…\nHPとMPが かいふくした！']);
        } else {
          sfx('cancel');
          this.showMessage(['おかねが たりないよ！']);
        }
      } else {
        sfx('cancel');
        this.state = 'field';
      }
    }
    if (isB()) { sfx('cancel'); this.state = 'field'; }
  }

  renderInn() {
    this.renderField();
    const m = this.currentMap();
    this.drawWindow(40, 60, 176, 70);
    this.drawText(`やどや - ${m.inn.price}ゴールド`, 56, 68, '#FFDD33', 11);
    this.drawText('とまる', 80, 92, this.menuIdx === 0 ? '#FFDD33' : '#FFF');
    this.drawText('やめる', 80, 112, this.menuIdx === 1 ? '#FFDD33' : '#FFF');
    this.drawText('▶', 64, this.menuIdx === 0 ? 92 : 112, '#FFDD33');
  }

  // --- State: Confirm ---
  updateConfirm() {
    if (isDirOnce('up') || isDirOnce('down')) { sfx('cursor'); this.confirmIdx = this.confirmIdx === 0 ? 1 : 0; }
    if (isA()) {
      if (this.confirmIdx === 0) {
        sfx('confirm');
        if (this.confirmCb) { this.confirmCb(); this.confirmCb = null; }
      } else {
        sfx('cancel');
        this.state = 'menu';
      }
    }
    if (isB()) { sfx('cancel'); this.state = 'menu'; }
  }

  renderConfirm() {
    this.renderMenu();
    this.drawWindow(40, 60, 176, 70);
    this.drawText(this.confirmMsg, 56, 68, '#FFDD33', 11);
    this.drawText('はい', 80, 92, this.confirmIdx === 0 ? '#FFDD33' : '#FFF');
    this.drawText('いいえ', 80, 112, this.confirmIdx === 1 ? '#FFDD33' : '#FFF');
    this.drawText('▶', 64, this.confirmIdx === 0 ? 92 : 112, '#FFDD33');
  }

  // --- State: Ending ---
  updateEnding() {
    // Phase 0-2: text screens (ゾムト封印 → 光を取り戻す → まおうの魂)
    if (this.endingPhase <= 2) {
      if (isA()) {
        sfx('confirm');
        this.endingPhase++;
        if (this.endingPhase === 3) {
          // Transition to startTown, place player near king
          this.fadeDir = 1; this.fade = 0;
          this.fadeCb = () => {
            this.mapId = 'startTown';
            this.player.x = 7; this.player.y = 9;
            this.player.hp = this.player.maxHp;
            this.player.mp = this.player.maxMp;
            BGM.play('town');
            this.fadeDir = -1;
            this.fadeCb = () => {
              this.fadeDir = 0;
              this.endingPhase = 3;
            };
          };
        }
      }
    }
    // Phase 3-5: king dialog in town
    else if (this.endingPhase >= 3 && this.endingPhase <= 5) {
      if (isA()) {
        sfx('confirm');
        this.endingPhase++;
        if (this.endingPhase === 6) {
          // Start ending BGM and credits
          BGM.stop();
          BGM.play('ending');
          this.endingTimer = 0;
        }
      }
    }
    // Phase 6: credits with music
    else if (this.endingPhase === 6) {
      this.endingTimer++;
      if (this.endingTimer > 120 && isA()) {
        this.endingPhase = 7;
      }
    }
    // Phase 7: final END + press to title
    else if (this.endingPhase === 7) {
      if (isA()) {
        BGM.stop();
        this.state = 'title';
        this.menuIdx = 0;
      }
    }
  }

  renderEnding() {
    const endMsgs = [
      'ゾムトは ゾムトくうかんに\nふういん された…！',
      'ゆうしゃの ロウチョンが\nやみの ちからを\nとじこめたのだ。',
      'まおうの たましいは\nひかりを とりもどした…\n「ありがとう… ゆうしゃよ…」',
    ];
    const kingMsgs = [
      'おお ゆうしゃよ！\nよくぞ もどってきた！',
      'せかいに ひかりが\nもどったのじゃ！\nおまえこそ しんの\nゆうしゃじゃ！',
      'このくにの みなが\nおまえに かんしゃ\nしておる。\nほんとうに ありがとう！',
    ];

    if (this.endingPhase <= 2) {
      // Dark background with text
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, SW, SH);
      this.drawWindow(16, 40, SW - 32, 160);
      const lines = endMsgs[this.endingPhase].split('\n');
      lines.forEach((l, i) => this.drawText(l, 32, 56 + i * 20, '#FFDD33', 13));
    }
    else if (this.endingPhase >= 3 && this.endingPhase <= 5) {
      // Show town field with king dialog
      this.renderField();
      this.drawWindow(16, 40, SW - 32, 120);
      this.drawText('おうさま', 32, 48, '#FFDD33', 10);
      const lines = kingMsgs[this.endingPhase - 3].split('\n');
      lines.forEach((l, i) => this.drawText(l, 32, 68 + i * 18, '#FFF', 12));
    }
    else if (this.endingPhase === 6) {
      // Credits scroll
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, SW, SH);
      const t = this.endingTimer;
      const alpha = Math.min(1, t / 60);
      this.ctx.globalAlpha = alpha;
      this.drawText('こうして ゆうしゃは', SW/2 - 70, 40, '#FFDD33', 12);
      this.drawText('でんせつとなった。', SW/2 - 65, 64, '#FFDD33', 12);
      if (t > 30) {
        this.drawText('ひかりのおうは もとの', SW/2 - 75, 100, '#FFF', 11);
        this.drawText('すがたを とりもどし', SW/2 - 70, 118, '#FFF', 11);
        this.drawText('くにに へいわが もどった。', SW/2 - 82, 136, '#FFF', 11);
      }
      if (t > 70) {
        this.drawText('勇者ものがたり', SW/2 - 55, 180, '#FFDD33', 14);
      }
      this.ctx.globalAlpha = 1;
    }
    else if (this.endingPhase === 7) {
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, SW, SH);
      const blink = Math.floor(this.frame / 30) % 2 === 0;
      this.drawText('- E N D -', SW/2 - 45, SH/2 - 20, '#FFDD33', 16);
      if (blink) this.drawText('Aボタンで タイトルへ', SW/2 - 65, SH/2 + 30, '#999', 10);
    }
  }

  // --- Save / Load ---
  saveGame() {
    const data = {
      player: this.player,
      mapId: this.mapId,
      chestStates: this.chestStates,
    };
    try {
      localStorage.setItem('yuusha_save', JSON.stringify(data));
      sfx('confirm');
      this.showMessage(['ぼうけんのしょに\nきろくしました！']);
    } catch(e) {
      sfx('cancel');
      this.showMessage(['セーブに しっぱいしました…']);
    }
  }

  loadGame() {
    try {
      const raw = localStorage.getItem('yuusha_save');
      if (!raw) { this.showMessage(['ぼうけんのしょが\nみつかりません！']); return; }
      const data = JSON.parse(raw);
      this.player = data.player;
      this.mapId = data.mapId;
      this.chestStates = data.chestStates || {};
      this.state = 'field';
      sfx('confirm');
    } catch(e) {
      sfx('cancel');
      this.showMessage(['ロードに しっぱいしました…']);
    }
  }

  // --- Fade effect ---
  updateFade() {
    if (this.fadeDir > 0) {
      this.fade += 0.05;
      if (this.fade >= 1) {
        this.fade = 1;
        if (this.fadeCb) { const cb = this.fadeCb; this.fadeCb = null; cb(); }
      }
    } else if (this.fadeDir < 0) {
      this.fade -= 0.05;
      if (this.fade <= 0) {
        this.fade = 0;
        this.fadeDir = 0;
        if (this.fadeCb) { const cb = this.fadeCb; this.fadeCb = null; cb(); }
      }
    }
  }

  renderFade() {
    if (this.fade > 0) {
      this.ctx.fillStyle = `rgba(0,0,0,${this.fade})`;
      this.ctx.fillRect(0, 0, SW, SH);
    }
  }

  // --- Main loop ---
  update() {
    this.updateFade();
    switch(this.state) {
      case 'title': this.updateTitle(); break;
      case 'field': this.updateField(); break;
      case 'battle': this.updateBattle(); break;
      case 'menu': this.updateMenu(); break;
      case 'dialog': this.updateDialog(); break;
      case 'shop': this.updateShop(); break;
      case 'inn': this.updateInn(); break;
      case 'confirm': this.updateConfirm(); break;
      case 'ending': this.updateEnding(); break;
    }
  }

  render() {
    switch(this.state) {
      case 'title': this.renderTitle(); break;
      case 'field': this.renderField(); break;
      case 'battle': this.renderBattle(); break;
      case 'menu': this.renderMenu(); break;
      case 'dialog': this.renderDialog(); break;
      case 'shop': this.renderShop(); break;
      case 'inn': this.renderInn(); break;
      case 'confirm': this.renderConfirm(); break;
      case 'ending': this.renderEnding(); break;
    }
    this.renderFade();
  }
}

// === Start ===
let _game = null;
window.addEventListener('load', () => {
  _game = new Game();
  _game.start();
});

// === Debug / Test Commands ===
// Usage: open browser console (F12) and type any of these commands.
const DEBUG = {
  // --- Teleport to towns ---
  goStartTown() {
    _game.newGame();
    _game.mapId = 'startTown';
    _game.player.x = 7; _game.player.y = 6;
    _game.player.level = 3; _game.player.gold = 80;
    _game.player.flags.gotQuest = true;
    const s = LEVEL_TABLE[2];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal'];
    _game.player.weapon = 'copperSword'; _game.player.armor = 'leather'; _game.player.shield = 'leatherShield';
    _game.player.items = ['herb','herb','herb'];
    BGM.play('town');
    console.log('>> はじまりの村にワープ (Lv3, 初期装備)');
  },
  goLakeTown() {
    _game.newGame();
    _game.mapId = 'lakeTown';
    _game.player.x = 7; _game.player.y = 5;
    _game.player.level = 5; _game.player.gold = 200;
    _game.player.flags.gotQuest = true;
    const s = LEVEL_TABLE[4];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire'];
    _game.player.weapon = 'copperSword'; _game.player.armor = 'leather'; _game.player.shield = 'leatherShield';
    _game.player.items = ['herb','herb','herb','antidote'];
    BGM.play('town');
    console.log('>> みずうみの町にワープ (Lv5, 初級装備)');
  },
  goPortTown() {
    _game.newGame();
    _game.mapId = 'portTown';
    _game.player.x = 5; _game.player.y = 6;
    _game.player.level = 10; _game.player.gold = 500;
    _game.player.flags.gotQuest = true;
    _game.player.flags.caveBossDefeated = true;
    const s = LEVEL_TABLE[9];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire','warp','healA'];
    _game.player.weapon = 'ironSword'; _game.player.armor = 'chain'; _game.player.shield = 'ironShield';
    _game.player.items = ['strongHerb','strongHerb','magicDrop','magicDrop','warpWing'];
    BGM.play('town');
    console.log('>> うみべの町にワープ (Lv10, 中級装備)');
  },

  // --- Teleport to dungeons ---
  goCave() {
    _game.newGame();
    _game.mapId = 'cave';
    _game.player.x = 1; _game.player.y = 14;
    _game.player.level = 7; _game.player.gold = 300;
    _game.player.flags.gotQuest = true;
    const s = LEVEL_TABLE[6];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire','warp'];
    _game.player.weapon = 'ironSword'; _game.player.armor = 'chain'; _game.player.shield = 'ironShield';
    _game.player.items = ['herb','herb','strongHerb','torch','warpWing'];
    _game.player.flags.hasTorch = true;
    BGM.play('field');
    console.log('>> やみの洞窟にワープ (Lv7, 中級装備, たいまつ付き)');
  },
  goCaveBoss() {
    this.goCave();
    _game.player.x = 7; _game.player.y = 13;
    console.log('>> 洞窟ボス(ガーゴイル)の手前に移動');
  },
  goDarkCastle() {
    _game.newGame();
    _game.mapId = 'darkCastle';
    _game.player.x = 7; _game.player.y = 14;
    _game.player.level = 14; _game.player.gold = 1000;
    _game.player.flags.gotQuest = true;
    _game.player.flags.caveBossDefeated = true;
    const s = LEVEL_TABLE[13];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire','warp','healA','fireA','ultima'];
    _game.player.weapon = 'steelSword'; _game.player.armor = 'ironArmor'; _game.player.shield = 'steelShield';
    _game.player.items = ['strongHerb','strongHerb','strongHerb','magicDrop','magicDrop','warpWing'];
    BGM.play('field');
    console.log('>> まおうの城にワープ (Lv14, 上級装備+アルテマ)');
  },
  goCastleMidBoss() {
    this.goDarkCastle();
    _game.player.x = 7; _game.player.y = 12;
    console.log('>> 城中ボス(あんこくきし)の手前に移動');
  },

  // --- Boss battles ---
  fightCaveBoss() {
    this.goCave();
    _game.startBattle('gargoyle', false, 'caveBossDefeated');
    console.log('>> ガーゴイル戦開始');
  },
  fightCastleMidBoss() {
    this.goDarkCastle();
    _game.startBattle('darkKnight', false, 'castleMidBossDefeated');
    console.log('>> あんこくきし戦開始');
  },
  fightDemonLord() {
    _game.newGame();
    _game.mapId = 'darkCastle';
    _game.player.x = 7; _game.player.y = 3;
    _game.player.level = 18; _game.player.gold = 2000;
    _game.player.flags.gotQuest = true;
    _game.player.flags.caveBossDefeated = true;
    _game.player.flags.castleMidBossDefeated = true;
    const s = LEVEL_TABLE[17];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire','warp','healA','fireA','escape','ultima'];
    _game.player.weapon = 'lightSword'; _game.player.armor = 'lightArmor'; _game.player.shield = 'lightShield';
    _game.player.items = ['strongHerb','strongHerb','strongHerb','magicDrop','magicDrop','magicDrop'];
    _game.startBattle('demonLord', true);
    BGM.play('boss');
    console.log('>> まおう戦開始 (Lv18, ひかり装備, アイテム充実)');
  },
  fightZomt() {
    _game.newGame();
    _game.player.level = 18;
    _game.player.flags.gotQuest = true;
    _game.player.flags.caveBossDefeated = true;
    _game.player.flags.castleMidBossDefeated = true;
    _game.player.flags.bossDefeated = true;
    const s = LEVEL_TABLE[17];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=Math.floor(s[1]*0.6); _game.player.mp=80;
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.spells = ['heal','fire','warp','healA','fireA','escape','ultima','roucon'];
    _game.player.weapon = 'lightSword'; _game.player.armor = 'lightArmor'; _game.player.shield = 'lightShield';
    _game.player.items = ['strongHerb','magicDrop','magicDrop'];
    const md = MONSTERS.zomt;
    _game.battle = {
      monster: { ...md, currentHp: md.hp },
      monsterId: 'zomt',
      phase: 'encounter',
      cmdIdx: 0,
      msg: `${md.name}が あらわれた！`,
      msgQueue: ['このてきには ふつうの\nこうげきは きかない…！','ロウチョンの じゅもんで\nふういんするのだ！'],
      timer: 60, spellIdx: 0, itemIdx: 0,
      isBoss: true, sealCount: 0, sealMax: md.sealMax || 8,
    };
    _game.state = 'battle';
    BGM.play('zomt');
    console.log('>> ゾムト戦開始 (Lv18, HP60%, MP80, ロウチョン習得済み)');
  },

  // --- Ending ---
  showEnding(phase) {
    _game.newGame();
    _game.player.flags.bossDefeated = true;
    _game.player.flags.zomtDefeated = true;
    _game.state = 'ending';
    _game.ending = true;
    _game.endingPhase = phase || 0;
    _game.endingTimer = 0;
    BGM.stop();
    if ((phase || 0) >= 3) {
      _game.mapId = 'startTown';
      _game.player.x = 7; _game.player.y = 9;
      _game.player.hp = _game.player.maxHp;
      _game.player.mp = _game.player.maxMp;
      BGM.play('town');
    }
    if ((phase || 0) >= 6) {
      BGM.stop();
      BGM.play('ending');
    }
    console.log(`>> エンディング表示 (フェーズ${phase || 0})`);
  },

  // --- Utility ---
  maxLevel() {
    if (!_game.player) { console.log('ゲームを開始してください'); return; }
    _game.player.level = 20;
    const s = LEVEL_TABLE[19];
    _game.player.maxHp=s[1]; _game.player.maxMp=s[2]; _game.player.hp=s[1]; _game.player.mp=s[2];
    _game.player.atk=s[3]; _game.player.def=s[4]; _game.player.spd=s[5];
    _game.player.exp = 12000;
    _game.player.spells = ['heal','fire','warp','healA','fireA','escape','ultima'];
    console.log('>> Lv20に設定 (全呪文習得)');
  },
  maxGold() {
    if (!_game.player) { console.log('ゲームを開始してください'); return; }
    _game.player.gold = 9999;
    console.log('>> ゴールド9999に設定');
  },
  fullHeal() {
    if (!_game.player) { console.log('ゲームを開始してください'); return; }
    _game.player.hp = _game.player.maxHp;
    _game.player.mp = _game.player.maxMp;
    console.log('>> HP/MP全回復');
  },
  bestEquip() {
    if (!_game.player) { console.log('ゲームを開始してください'); return; }
    _game.player.weapon = 'lightSword';
    _game.player.armor = 'lightArmor';
    _game.player.shield = 'lightShield';
    console.log('>> ひかり装備一式を装備');
  },
  addItems() {
    if (!_game.player) { console.log('ゲームを開始してください'); return; }
    _game.player.items = ['herb','herb','strongHerb','strongHerb','magicDrop','magicDrop','magicDrop','warpWing','torch'];
    console.log('>> アイテムを補充');
  },
  help() {
    console.log(`
=== 勇者ものがたり デバッグコマンド ===
ブラウザコンソール(F12)で実行:

【町にワープ】
  DEBUG.goStartTown()   - はじまりの村
  DEBUG.goLakeTown()    - みずうみの町 (Lv5)
  DEBUG.goPortTown()    - うみべの町 (Lv10)

【ダンジョンにワープ】
  DEBUG.goCave()        - やみの洞窟入口 (Lv7)
  DEBUG.goCaveBoss()    - 洞窟ボス手前
  DEBUG.goDarkCastle()  - まおうの城入口 (Lv14)
  DEBUG.goCastleMidBoss() - 城中ボス手前

【ボス戦】
  DEBUG.fightCaveBoss()     - ガーゴイル戦
  DEBUG.fightCastleMidBoss() - あんこくきし戦
  DEBUG.fightDemonLord()    - まおう戦 (Lv18)
  DEBUG.fightZomt()         - ゾムト戦 (Lv18)

【エンディング】
  DEBUG.showEnding()    - エンディング表示 (最初から)
  DEBUG.showEnding(3)   - 王様シーンから
  DEBUG.showEnding(6)   - クレジットから

【ユーティリティ】
  DEBUG.maxLevel()      - Lv20に設定
  DEBUG.maxGold()       - ゴールド9999
  DEBUG.fullHeal()      - HP/MP全回復
  DEBUG.bestEquip()     - ひかり装備一式
  DEBUG.addItems()      - アイテム補充
  DEBUG.help()          - このヘルプ表示
    `);
  }
};
