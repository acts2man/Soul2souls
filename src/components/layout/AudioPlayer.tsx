import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../ui/Icon";
import { INTRO_TRACK } from "../../data/mediaSrc";
import styles from "./AudioPlayer.module.css";

// Static waveform bar heights (deterministic so SSR/re-renders match).
const BARS = Array.from({ length: 64 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.29)) * 0.8 + 0.2;
  return Math.round(v * 100) / 100;
});

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.8);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => {
      setDur(a.duration || 0);
      setReady(true);
    };
    const onEnd = () => !a.loop && setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.volume = vol;
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [vol]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        await a.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay/asset unavailable — keep UI responsive.
      setPlaying((p) => !p);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * dur;
    setCur(a.currentTime);
  };

  const progress = dur ? cur / dur : 0;
  const remaining = useMemo(() => `-${fmt(Math.max(0, dur - cur))}`, [dur, cur]);

  return (
    <div className={styles.player} role="region" aria-label="Audio player">
      <audio ref={audioRef} src={INTRO_TRACK} loop={loop} preload="metadata" />

      <div className={styles.track}>
        <img src="/img/shared/logo.webp" alt="" className={styles.art} />
        <div className={styles.meta}>
          <p className={styles.title}>DJ Perry AKA JazzAmp</p>
          <p className={styles.sub}>Welcome to Soul2Souls</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button aria-label="Previous" className={styles.ctrl}>
          <Icon name="prev" size={20} />
        </button>
        <button aria-label={playing ? "Pause" : "Play"} className={styles.play} onClick={toggle}>
          <Icon name={playing ? "pause" : "play"} size={22} />
        </button>
        <button aria-label="Next" className={styles.ctrl}>
          <Icon name="next" size={20} />
        </button>
        <button
          aria-label="Toggle repeat"
          aria-pressed={loop}
          className={`${styles.ctrl} ${loop ? styles.on : ""}`}
          onClick={() => {
            setLoop((l) => !l);
            if (audioRef.current) audioRef.current.loop = !loop;
          }}
        >
          <Icon name="repeat" size={18} />
        </button>
      </div>

      <div className={styles.scrubWrap}>
        <span className={styles.time}>{fmt(cur)}</span>
        <div className={styles.wave} onClick={seek} role="slider" aria-label="Seek" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} tabIndex={0}>
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`${styles.bar} ${i / BARS.length <= progress ? styles.barOn : ""}`}
              style={{ height: `${18 + h * 82}%` }}
            />
          ))}
        </div>
        <span className={styles.time}>{ready ? remaining : "00:00"}</span>
      </div>

      <div className={styles.volume}>
        <Icon name="volume" size={20} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={vol}
          aria-label="Volume"
          onChange={(e) => {
            const v = Number(e.target.value);
            setVol(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
        />
      </div>
    </div>
  );
}
