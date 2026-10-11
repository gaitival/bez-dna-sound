import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";

interface TrackAudioPlayerProps {
  audioUrl?: string;
  defaultDuration?: number;
  trackTitle: string;
  isActive: boolean;
  onPlay: () => void;
  onPause: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function TrackAudioPlayer({
  audioUrl = "/audio/track-1.wav",
  defaultDuration = 30,
  trackTitle,
  isActive,
  onPlay,
  onPause,
}: TrackAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackBarRef = useRef<HTMLDivElement | null>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(defaultDuration);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Синхронизация состояния: если другой трек стал активным, ставим на паузу этот
  useEffect(() => {
    if (!isActive && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  // Установка длительности из метаданных аудио
  const handleLoadedMetadata = () => {
    if (audioRef.current && Number.isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (!isDragging && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    onPause();
  };

  // Переключение воспроизведения
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPause();
    } else {
      onPlay();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn(`[AudioPlayer] Autoplay prevented or error for ${trackTitle}:`, err);
      });
    }
  };

  // Перемотка трека по клику/драгу на полосе прогресса
  const updateSeekPosition = useCallback(
    (clientX: number, startPlay = false) => {
      if (!trackBarRef.current) return;
      const rect = trackBarRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = rect.width > 0 ? clickX / rect.width : 0;
      const targetTime = percentage * duration;

      setCurrentTime(targetTime);

      if (audioRef.current) {
        audioRef.current.currentTime = targetTime;
        if (startPlay || !isPlaying) {
          onPlay();
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.warn(`[AudioPlayer] Seek play error:`, err);
          });
        }
      }
    },
    [duration, isPlaying, onPlay]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    // При клике на полосу — сразу устанавливаем позицию и начинаем воспроизведение
    updateSeekPosition(e.clientX, true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      updateSeekPosition(moveEvent.clientX, false);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div className="mt-5 pt-3.5 border-t border-border/40">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex flex-col gap-1.5">
        {/* Верхняя строка: белый треугольник Play и полоса строго на одной горизонтальной оси */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="p-1 -ml-1 text-white hover:text-cyan-300 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer flex items-center justify-center shrink-0"
            aria-label={isPlaying ? `Пауза трека ${trackTitle}` : `Воспроизвести трек ${trackTitle}`}
          >
            {isPlaying ? (
              <Pause className="size-4 fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            ) : (
              <Play className="size-4 fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] translate-x-0.5" />
            )}
          </button>

          {/* Полоса проигрывания с бегущим светящимся индикатором */}
          <div
            ref={trackBarRef}
            onPointerDown={handlePointerDown}
            className="relative flex-1 h-5 flex items-center cursor-pointer select-none touch-none group"
            role="slider"
            aria-label={`Прогресс трека ${trackTitle}`}
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            tabIndex={0}
          >
            {/* Тёмная направляющая дорожка (rail) */}
            <div className="w-full h-2 rounded-full bg-[hsl(240_8%_18%)] overflow-hidden relative border border-white/5">
              {/* Заполненная часть трека с бирюзовым свечением */}
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Круглый светящийся ползунок (белая точка с бирюзовым ореолом) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full bg-white shadow-[0_0_14px_4px_hsl(185_95%_50%/0.85)] border border-cyan-100 pointer-events-none transition-transform group-hover:scale-115"
              style={{ left: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Нижняя строка: индикатор времени, аккуратно выровненный под полосой */}
        <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/80 pl-6 pr-0.5">
          <span className="text-foreground/90 font-medium">{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
