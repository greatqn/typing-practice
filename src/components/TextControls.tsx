import { Settings } from 'lucide-react';
import { useState } from 'react';

interface TextControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (height: number) => void;
}

export default function TextControls({ 
  fontSize, 
  setFontSize, 
  lineHeight, 
  setLineHeight 
}: TextControlsProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="relative">
      <button
        className="btn btn-ghost btn-sm btn-circle absolute top-2 right-2"
        onClick={() => setShowControls(!showControls)}
        title="显示/隐藏文本设置"
      >
        <Settings className="w-4 h-4" />
      </button>
      
      {showControls && (
        <div className="absolute top-12 right-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64 z-10">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">字体大小</span>
                <span className="text-sm text-gray-500">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="range range-success range-xs w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">行高</span>
                <span className="text-sm text-gray-500">{lineHeight}</span>
              </div>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="range range-success range-xs w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}