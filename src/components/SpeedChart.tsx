interface SpeedDataPoint {
  time: number;
  wpm: number;
}

const SpeedChart = ({ speedData }: { speedData: SpeedDataPoint[] }) => {
  const height = 80;
  const width = 200;
  const padding = 20;

  const minWPM = 0;
  const maxWPM = Math.max(200, ...speedData.map(d => d.wpm));
  const currentWPM = speedData.length > 0 ? 
      Math.min(speedData[speedData.length - 1].wpm, 999) : 0;

  const xScale = (width - 2 * padding) / Math.max(speedData.length - 1, 1);
  const yScale = (height - 2 * padding) / (maxWPM - minWPM);

  const generateSmoothPath = (data: SpeedDataPoint[]) => {
    if (data.length < 2) return '';
    
    let path = `M ${padding} ${height - padding - ((Math.min(data[0].wpm, 999) - minWPM) * yScale)}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = padding + i * xScale;
      const y = height - padding - ((Math.min(data[i].wpm, 999) - minWPM) * yScale);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border-success border text-success">
      <div className="flex-1">
        <div className="text-2xl font-bold">{currentWPM}</div>
        <div className="text-sm opacity-80">WPM</div>
      </div>
      
      <div className="flex-1">
        <svg width={width} height={height} className="overflow-visible">
          <path
            d={generateSmoothPath(speedData)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-success"
          />
        </svg>
      </div>
    </div>
  );
};

export default SpeedChart;