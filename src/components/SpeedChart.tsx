interface SpeedDataPoint {
  time: number;
  wpm: number;
}

const SpeedChart = ({ speedData }: { speedData: SpeedDataPoint[] }) => {
  const height = 120;
  const width = 300;
  const padding = 30;

  // 设置最小最大值范围
  const minWPM = 0;
  const maxWPM = Math.max(200, ...speedData.map(d => d.wpm));
  const currentWPM = speedData.length > 0 ? 
      Math.min(speedData[speedData.length - 1].wpm, 999) : 0;  // 限制最大显示值
  
  // 计算比例尺
  const xScale = (width - 2 * padding) / Math.max(speedData.length - 1, 1);
  const yScale = (height - 2 * padding) / (maxWPM - minWPM);

  // 生成Y轴刻度值数组
  const yTicks = [0, 50, 100, 150, 200];

  // 生成平滑的路径
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
    <div className="speed-chart p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-sm mb-2 text-gray-700 dark:text-gray-300">
        打字速度 (WPM): <span className="font-bold">{currentWPM}</span>
      </h3>
      <svg width={width} height={height}>
        {/* Y轴 */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="currentColor"
          className="text-gray-300 dark:text-gray-600"
        />
        {/* X轴 */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="currentColor"
          className="text-gray-300 dark:text-gray-600"
        />
        
        {/* 速度曲线 */}
        <path
          d={generateSmoothPath(speedData)}
          fill="none"
          stroke="currentColor"
          className="text-success"
          strokeWidth="2"
        />
        
        {/* Y轴刻度 */}
        {yTicks.map(tick => (
          <g key={tick}>
            <line
              x1={padding - 3}
              x2={padding}
              y1={height - padding - ((tick - minWPM) * yScale)}
              y2={height - padding - ((tick - minWPM) * yScale)}
              stroke="currentColor"
              className="text-gray-300 dark:text-gray-600"
            />
            <text
              x={padding - 8}
              y={height - padding - ((tick - minWPM) * yScale)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs text-gray-500 dark:text-gray-400"
              style={{ fontSize: '10px' }}
            >
              {tick}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SpeedChart;