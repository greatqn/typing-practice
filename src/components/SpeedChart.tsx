import React from 'react';

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
  const currentWPM = speedData.length > 0 ? speedData[speedData.length - 1].wpm : 0;
  
  // 计算比例尺
  const xScale = (width - 2 * padding) / Math.max(speedData.length - 1, 1);
  const yScale = (height - 2 * padding) / (maxWPM - minWPM);

  // 生成Y轴刻度值数组
  const yTicks = [0, 50, 100, 150, 200];

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
        
        {/* 数据线和点 */}
        {speedData.length > 0 && (
          <g transform={`translate(${padding}, 0)`}>
            {speedData.map((point, i) => {
              const x = i * xScale;
              const y = height - padding - ((point.wpm - minWPM) * yScale);
              
              return (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <line
                      x1={(i-1) * xScale}
                      y1={height - padding - ((speedData[i-1].wpm - minWPM) * yScale)}
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      className="text-success"
                      strokeWidth={2}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    className="fill-success"
                  />
                </React.Fragment>
              );
            })}
          </g>
        )}

        {/* Y轴刻度 */}
        {yTicks.map((tick) => (
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

        {/* X轴刻度 */}
        <text
          x={padding}
          y={height - padding + 15}
          textAnchor="middle"
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          0s
        </text>
        {speedData.length > 0 && (
          <text
            x={width - padding}
            y={height - padding + 15}
            textAnchor="middle"
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {speedData[speedData.length - 1].time}s
          </text>
        )}
      </svg>
    </div>
  );
};

export default SpeedChart;