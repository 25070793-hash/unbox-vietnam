import { CharacterId } from '../types';

class AudioSynthesizerService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentTimeoutIds: number[] = [];
  private activeNodes: (AudioNode | { stop: (time: number) => void })[] = [];
  private isMuted: boolean = false;
  private volume: number = 0.3; // Default 30% as requested
  private activeCharacterId: CharacterId | null = null;
  private onEndCallback: (() => void) | null = null;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getActiveCharacterId(): CharacterId | null {
    return this.activeCharacterId;
  }

  public stopCurrentMelody() {
    this.currentTimeoutIds.forEach((id) => clearTimeout(id));
    this.currentTimeoutIds = [];

    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop(now);
        }
      } catch {
        // node already stopped
      }
    });
    this.activeNodes = [];
    const prevChar = this.activeCharacterId;
    this.activeCharacterId = null;

    if (this.onEndCallback) {
      const cb = this.onEndCallback;
      this.onEndCallback = null;
      cb();
    }
    return prevChar;
  }

  // --- Character Melodies (8 - 11 seconds) ---

  public playCharacterMelody(id: CharacterId, onEnd?: () => void) {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    // If already playing this same character, stop it (toggle)
    if (this.activeCharacterId === id) {
      this.stopCurrentMelody();
      return;
    }

    // Stop previous before playing new
    this.stopCurrentMelody();
    this.activeCharacterId = id;
    this.onEndCallback = onEnd || null;

    switch (id) {
      case 'crybaby-co-tam':
        this.playCrybabyCoTam(ctx);
        break;
      case 'hirono-tra-da':
        this.playHironoTraDa(ctx);
        break;
      case 'labubu-chu-teu':
        this.playLabubuChuTeu(ctx);
        break;
      case 'sweetbean-to-he':
        this.playSweetBeanToHe(ctx);
        break;
      case 'hacipupu-si-tu':
        this.playHacipupuSiTu(ctx);
        break;
      case 'skullpanda-nhat-binh':
        this.playSkullpandaNhatBinh(ctx);
        break;
      case 'pucky-ca-chep':
        this.playPuckyCaChep(ctx);
        break;
    }
  }

  /**
   * Helper: Schedule note with đàn tranh pluck timbre
   */
  private pluckDanTranh(ctx: AudioContext, freq: number, startTime: number, duration: number = 1.2) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle pitch dip for traditional Vietnamese zither bend
    osc.frequency.linearRampToValueAtTime(freq * 1.015, startTime + 0.08);
    osc.frequency.linearRampToValueAtTime(freq, startTime + 0.25);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
    this.activeNodes.push(osc);
  }

  /**
   * Helper: Sáo trúc (bamboo flute) timbre
   */
  private playBambooFlute(ctx: AudioContext, freq: number, startTime: number, duration: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, startTime);
    vibratoGain.gain.setValueAtTime(freq * 0.02, startTime);
    vibrato.connect(osc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration);
    this.activeNodes.push(vibrato);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.28, startTime + 0.09);
    gain.gain.setValueAtTime(0.26, startTime + duration - 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
    this.activeNodes.push(osc);
  }

  /**
   * 1. Crybaby – Cô Tấm: Đàn tranh & sáo trúc cổ tích ngũ cung
   */
  private playCrybabyCoTam(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;
    // Pentatonic scale (D4, E4, G4, A4, B4, D5, E5)
    const notes = [
      { f: 293.66, t: 0.0, d: 1.0 }, // D4
      { f: 392.00, t: 0.8, d: 1.2 }, // G4
      { f: 440.00, t: 1.8, d: 0.9 }, // A4
      { f: 587.33, t: 2.7, d: 1.5 }, // D5
      { f: 493.88, t: 4.2, d: 1.0 }, // B4
      { f: 440.00, t: 5.2, d: 1.1 }, // A4
      { f: 392.00, t: 6.3, d: 1.4 }, // G4
      { f: 293.66, t: 7.7, d: 2.2 }, // D4
    ];

    notes.forEach((n) => {
      this.pluckDanTranh(ctx, n.f, t0 + n.t, n.d);
    });

    // Flute harmony accompanying
    this.playBambooFlute(ctx, 587.33, t0 + 2.7, 1.4);
    this.playBambooFlute(ctx, 440.00, t0 + 5.2, 1.2);
    this.playBambooFlute(ctx, 392.00, t0 + 7.7, 2.2);

    this.scheduleMelodyEnd(10000);
  }

  /**
   * 2. Hirono – Trà Đá Vỉa Hè: Lo-fi thư thái, gõ ly, hợp âm jazz chill
   */
  private playHironoTraDa(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;

    // Warm Rhodes-like electric piano chords
    const chordSeq = [
      { chords: [261.63, 329.63, 392.00, 493.88], time: 0.0, dur: 2.4 }, // Cmaj7
      { chords: [220.00, 261.63, 329.63, 392.00], time: 2.5, dur: 2.4 }, // Am7
      { chords: [174.61, 220.00, 261.63, 329.63], time: 5.0, dur: 2.4 }, // Fmaj7
      { chords: [196.00, 246.94, 293.66, 392.00], time: 7.5, dur: 2.6 }, // Gsus4 -> G
    ];

    chordSeq.forEach(({ chords, time, dur }) => {
      chords.forEach((freq) => {
        if (!this.masterGain) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t0 + time);

        gain.gain.setValueAtTime(0, t0 + time);
        gain.gain.linearRampToValueAtTime(0.12, t0 + time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + time + dur);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t0 + time);
        osc.stop(t0 + time + dur);
        this.activeNodes.push(osc);
      });
    });

    // Glass clink sounds at sidewalk table (subtle high crystalline taps)
    [0.7, 1.9, 3.2, 4.4, 5.8, 7.1, 8.4].forEach((t) => {
      if (!this.masterGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400 + Math.random() * 200, t0 + t);
      gain.gain.setValueAtTime(0.07, t0 + t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + t + 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t0 + t);
      osc.stop(t0 + t + 0.16);
      this.activeNodes.push(osc);
    });

    this.scheduleMelodyEnd(10200);
  }

  /**
   * 3. Labubu – Chú Tễu Thủy Đình: Trống hội, phách gỗ, dân gian Bắc Bộ
   */
  private playLabubuChuTeu(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;

    // Drum beats & wood clapper rhythms: Tùng... Cắc... Tùng Tùng Cắc
    const rhythm = [
      { type: 'drum', t: 0.0 },
      { type: 'wood', t: 0.4 },
      { type: 'drum', t: 0.8 },
      { type: 'drum', t: 1.1 },
      { type: 'wood', t: 1.4 },
      { type: 'drum', t: 2.0 },
      { type: 'wood', t: 2.4 },
      { type: 'drum', t: 2.8 },
      { type: 'drum', t: 3.1 },
      { type: 'wood', t: 3.4 },
      { type: 'melody', f: 440, t: 4.0 },
      { type: 'melody', f: 493.88, t: 4.4 },
      { type: 'melody', f: 587.33, t: 4.8 },
      { type: 'drum', t: 5.2 },
      { type: 'wood', t: 5.5 },
      { type: 'melody', f: 659.25, t: 6.0 },
      { type: 'melody', f: 587.33, t: 6.4 },
      { type: 'drum', t: 6.8 },
      { type: 'drum', t: 7.2 },
      { type: 'wood', t: 7.6 },
      { type: 'drum', t: 8.0 },
      { type: 'drum', t: 8.3 },
    ];

    rhythm.forEach((item) => {
      if (item.type === 'drum') {
        this.playFestivalDrum(ctx, t0 + item.t);
      } else if (item.type === 'wood') {
        this.playWoodClapper(ctx, t0 + item.t);
      } else if (item.type === 'melody' && item.f) {
        this.pluckDanTranh(ctx, item.f, t0 + item.t, 0.7);
      }
    });

    this.scheduleMelodyEnd(9500);
  }

  private playFestivalDrum(ctx: AudioContext, time: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.28);

    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.32);
    this.activeNodes.push(osc);
  }

  private playWoodClapper(ctx: AudioContext, time: number) {
    if (!this.masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(950, time);
    osc.frequency.exponentialRampToValueAtTime(500, time + 0.08);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.1);
    this.activeNodes.push(osc);
  }

  /**
   * 4. Sweet Bean – Bé Tò He: Sáo trúc đồng dao vui tươi, líu lo
   */
  private playSweetBeanToHe(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;
    const melody = [
      { f: 523.25, t: 0.0, d: 0.35 }, // C5
      { f: 587.33, t: 0.4, d: 0.35 }, // D5
      { f: 659.25, t: 0.8, d: 0.6 },  // E5
      { f: 783.99, t: 1.5, d: 0.5 },  // G5
      { f: 880.00, t: 2.1, d: 0.8 },  // A5
      { f: 783.99, t: 3.0, d: 0.4 },  // G5
      { f: 659.25, t: 3.5, d: 0.4 },  // E5
      { f: 587.33, t: 4.0, d: 0.7 },  // D5
      { f: 659.25, t: 4.8, d: 0.4 },  // E5
      { f: 783.99, t: 5.3, d: 0.6 },  // G5
      { f: 880.00, t: 6.0, d: 0.8 },  // A5
      { f: 1046.50, t: 7.0, d: 1.4 }, // C6
    ];

    melody.forEach((n) => {
      this.playBambooFlute(ctx, n.f, t0 + n.t, n.d);
    });

    this.scheduleMelodyEnd(9000);
  }

  /**
   * 5. Hacipupu – Sĩ Tử Ngủ Gật: Đàn bầu nắn nót, chuông Văn Miếu ngân chậm
   */
  private playHacipupuSiTu(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;

    // Temple Bell Chime (Văn Miếu)
    this.playTempleBell(ctx, 220, t0);
    this.playTempleBell(ctx, 220, t0 + 4.5);

    // Dan Bau slide notes
    const danBauNotes = [
      { startF: 293.66, endF: 329.63, t: 0.8, d: 1.4 },
      { startF: 392.00, endF: 440.00, t: 2.4, d: 1.6 },
      { startF: 440.00, endF: 392.00, t: 5.2, d: 1.5 },
      { startF: 329.63, endF: 293.66, t: 6.9, d: 2.0 },
    ];

    danBauNotes.forEach((n) => {
      if (!this.masterGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.startF, t0 + n.t);
      osc.frequency.exponentialRampToValueAtTime(n.endF, t0 + n.t + n.d * 0.85);

      gain.gain.setValueAtTime(0, t0 + n.t);
      gain.gain.linearRampToValueAtTime(0.3, t0 + n.t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t0 + n.t);
      osc.stop(t0 + n.t + n.d);
      this.activeNodes.push(osc);
    });

    this.scheduleMelodyEnd(9600);
  }

  private playTempleBell(ctx: AudioContext, baseFreq: number, time: number) {
    if (!this.masterGain) return;
    const partials = [1, 2.76, 5.4];
    partials.forEach((mult, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * mult, time);

      const amp = 0.25 / (idx + 1);
      gain.gain.setValueAtTime(amp, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 3.8);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(time);
      osc.stop(time + 4.0);
      this.activeNodes.push(osc);
    });
  }

  /**
   * 6. Skullpanda – Nhật Bình Neon: Cung đình Huế hòa quyện Electronic Synth
   */
  private playSkullpandaNhatBinh(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;

    // Imperial pentatonic brass/bell chime
    const imperialNotes = [
      { f: 220.00, t: 0.0, d: 1.2 },
      { f: 261.63, t: 1.0, d: 1.0 },
      { f: 293.66, t: 2.0, d: 1.4 },
      { f: 392.00, t: 3.6, d: 1.8 },
      { f: 329.63, t: 5.6, d: 1.2 },
      { f: 261.63, t: 6.8, d: 2.2 },
    ];

    imperialNotes.forEach((n) => {
      this.playTempleBell(ctx, n.f, t0 + n.t);
    });

    // Cyber synth arp baseline
    const arpNotes = [440, 523.25, 587.33, 659.25, 587.33, 523.25, 440, 392];
    for (let i = 0; i < 16; i++) {
      const time = t0 + 0.2 + i * 0.45;
      const freq = arpNotes[i % arpNotes.length];
      if (!this.masterGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.frequency.exponentialRampToValueAtTime(350, time + 0.35);

      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.4);
      this.activeNodes.push(osc);
    }

    this.scheduleMelodyEnd(9600);
  }

  /**
   * 7. Pucky – Cá Chép Trông Trăng: Trống Trung thu, sáo & chuông gió vui nhộn
   */
  private playPuckyCaChep(ctx: AudioContext) {
    const t0 = ctx.currentTime + 0.05;

    // Lion dance mid-autumn drum rhythm: Tùng rinh rinh...
    const midAutumnDrums = [0.0, 0.4, 0.6, 1.2, 1.6, 1.8, 2.4, 2.8, 3.0, 4.0, 4.4, 4.6, 5.5, 6.0, 6.2, 7.2];
    midAutumnDrums.forEach((t) => {
      this.playFestivalDrum(ctx, t0 + t);
    });

    // Melodic flute & chimes
    const chimeMelody = [
      { f: 587.33, t: 0.5, d: 0.5 },
      { f: 659.25, t: 1.1, d: 0.5 },
      { f: 880.00, t: 1.7, d: 0.8 },
      { f: 783.99, t: 2.6, d: 0.6 },
      { f: 659.25, t: 3.3, d: 0.7 },
      { f: 880.00, t: 4.2, d: 0.6 },
      { f: 1046.50, t: 5.0, d: 1.2 },
      { f: 880.00, t: 6.4, d: 1.6 },
    ];

    chimeMelody.forEach((n) => {
      this.playBambooFlute(ctx, n.f, t0 + n.t, n.d);
      this.playTempleBell(ctx, n.f * 1.5, t0 + n.t);
    });

    this.scheduleMelodyEnd(9200);
  }

  private scheduleMelodyEnd(durationMs: number) {
    const timerId = window.setTimeout(() => {
      this.activeCharacterId = null;
      if (this.onEndCallback) {
        const cb = this.onEndCallback;
        this.onEndCallback = null;
        cb();
      }
    }, durationMs);
    this.currentTimeoutIds.push(timerId);
  }

  // --- UI Sound Effects ---

  public playUiSound(type: 'click' | 'coin' | 'box_open' | 'wheel_tick' | 'victory') {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
      case 'wheel_tick': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 'coin': {
        // Two-tone coin pickup
        [987.77, 1318.51].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.08;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          osc.connect(gain);
          gain.connect(this.masterGain!);
          osc.start(t);
          osc.stop(t + 0.22);
        });
        break;
      }
      case 'box_open': {
        // Dramatic magical swoosh + chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.45);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      }
      case 'victory': {
        // Arpeggiated fan-fare
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.12;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.22, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          osc.connect(gain);
          gain.connect(this.masterGain!);
          osc.start(t);
          osc.stop(t + 0.55);
        });
        break;
      }
    }
  }
}

export const audioSynth = new AudioSynthesizerService();
