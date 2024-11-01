interface SpeedDataPoint {
  time: number;
  wpm: number;
}

const SpeedChart = ({ speedData }: { speedData: SpeedDataPoint[] }) => {
  const height = 80;
  const width = 100;
  const padding = {
    left: 30,
    right: 10,
    top: 10,
    bottom: 20
  };
  const maxDisplayWPM = 200;

  const clampWPM = (wpm: number) => Math.min(wpm, maxDisplayWPM);
  
  const minWPM = 0;
  const maxWPM = Math.max(maxDisplayWPM, ...speedData.map(d => clampWPM(d.wpm)));
  const currentWPM = speedData.length > 0 ? clampWPM(speedData[speedData.length - 1].wpm) : 0;

  const xScale = (width - (padding.left + padding.right)) / Math.max(speedData.length - 1, 1);
  const yScale = (height - (padding.top + padding.bottom)) / (maxWPM - minWPM);

  const generateSmoothPath = (data: SpeedDataPoint[]) => {
    if (data.length < 2) return '';
    
    const points = data.map((d, i) => ({
      x: padding.left + i * xScale,
      y: height - padding.bottom - ((clampWPM(d.wpm) - minWPM) * yScale)
    }));
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border-success border text-success">
      <div className="flex-1">
        <div className="text-2xl font-bold">
          {currentWPM}
          {currentWPM >= maxDisplayWPM && '+'}
        </div>
        <div className="text-sm opacity-80">WPM</div>
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[10px] opacity-50" style={{ width: padding.left }}>
          <span>{maxDisplayWPM}</span>
          <span>{Math.floor(maxDisplayWPM / 2)}</span>
          <span>0</span>
        </div>
        
        <svg 
          width={width} 
          height={height} 
          className="overflow-visible"
        >
          <line 
            x1={padding.left} 
            y1={padding.top} 
            x2={padding.left} 
            y2={height - padding.bottom} 
            stroke="currentColor" 
            strokeOpacity="0.1" 
          />
          <line 
            x1={padding.left} 
            y1={height - padding.bottom} 
            x2={width - padding.right} 
            y2={height - padding.bottom} 
            stroke="currentColor" 
            strokeOpacity="0.1" 
          />
          
          <path
            d={generateSmoothPath(speedData)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default SpeedChart;