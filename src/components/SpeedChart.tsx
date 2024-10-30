import React from 'react';

interface SpeedDataPoint {
  time: number;
  wpm: number;
}

const SpeedChart = ({ speedData }: { speedData: SpeedDataPoint[] }) => {
  const maxWPM = Math.max(...speedData.map(d => d.wpm));
  const height = 100;
  const width = 200;

  return (
    <div className="speed-chart p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-sm mb-2">Typing Speed (WPM)</h3>
      <svg width={width} height={height}>
        {speedData.map((point, i) => {
          const x = (i / (speedData.length - 1)) * width;
          const y = height - (point.wpm / maxWPM) * height;
          
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <line
                  x1={(((i-1) / (speedData.length - 1)) * width)}
                  y1={height - (speedData[i-1].wpm / maxWPM) * height}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  className="text-success"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r="2"
                className="fill-success"
              />
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
};

export default SpeedChart;