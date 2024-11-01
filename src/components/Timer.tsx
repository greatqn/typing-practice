interface TimerProps {
  time: number;
  remainingTime: number;
}

export default function Timer({ time, remainingTime }: TimerProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-3 rounded-lg border-success border text-success flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">{formatTime(remainingTime)}</div>
      <div className="text-sm opacity-80">剩余时间</div>
    </div>
  );
}
