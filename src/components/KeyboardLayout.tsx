import React from 'react';

interface KeyboardLayoutProps {
  pressedKey: string;
  nextKey: string;
}

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ pressedKey, nextKey }) => {
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [' '] // 添加空格键行
  ];

  return (
    <div className="keyboard-layout p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {keyboardRows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <div
              key={key}
              className={`${
                key === ' ' ? 'w-40' : 'w-10'
              } h-10 flex items-center justify-center rounded transition-colors ${
                nextKey.toLowerCase() === key 
                  ? 'bg-success text-white' 
                  : 'bg-white dark:bg-gray-700'
              }`}
            >
              {key === ' ' ? 'Space' : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardLayout;