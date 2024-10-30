

const KeyboardLayout = ({ pressedKey }: { pressedKey: string }) => {
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="keyboard-layout p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {keyboardRows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <div
              key={key}
              className={`w-10 h-10 flex items-center justify-center rounded ${
                pressedKey.toLowerCase() === key 
                  ? 'bg-success text-white' 
                  : 'bg-white dark:bg-gray-700'
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardLayout;