interface TimerProps {
  time: number;
  remainingTime: number;
}

export default function Timer({  remainingTime }: TimerProps) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="p-3 rounded-lg border-success border text-success">
      <div className="text-2xl font-bold">{timeString}</div>
      <div className="text-sm opacity-80">剩余时间</div>
    </div>
  );
}
