import { useState } from 'react';
import { useCustomTextStore } from '../store/customTextStore';
import { Trash2Icon } from 'lucide-react';

const MAX_TEXTS = 5;
const MAX_LENGTH = 2000;

export default function CustomTextManager() {
  const [newText, setNewText] = useState('');
  const { texts, addText, removeText, clearAll, selectText } = useCustomTextStore();
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = newText.trim();
    if (trimmedText) {
      if (texts.length >= MAX_TEXTS) {
        alert(`最多只能添加 ${MAX_TEXTS} 个文本`);
        return;
      }
      if (trimmedText.length > MAX_LENGTH) {
        setShowError(true);
        return;
      }
      addText(trimmedText);
      setNewText('');
      setShowError(false);
    }
  };

  const sortedTexts = [...texts].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          自定义文本 ({texts.length}/{MAX_TEXTS})
        </h3>
        {texts.length > 0 && (
          <button
            onClick={clearAll}
            className="btn btn-sm btn-error"
          >
            清除全部
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <textarea
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
              setShowError(e.target.value.trim().length > MAX_LENGTH);
            }}
            placeholder="在此输入或粘贴文本..."
            className={`textarea textarea-bordered w-full h-24 ${
              showError ? 'textarea-error' : ''
            }`}
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {newText.length}/{MAX_LENGTH}
          </div>
        </div>
        {showError && (
          <p className="text-error text-sm">文本长度不能超过 {MAX_LENGTH} 个字符</p>
        )}
        <button 
          type="submit"
          className="btn btn-success w-full"
          disabled={!newText.trim() || showError || texts.length >= MAX_TEXTS}
        >
          添加文本
        </button>
      </form>

      {texts.length > 0 && (
        <div className="space-y-2">
          {sortedTexts.map((text) => (
            <div 
              key={text.id}
              className="p-3 bg-base-200 rounded-lg flex justify-between items-start gap-2"
            >
              <label className="flex items-start gap-2 flex-1">
                <input
                  type="radio"
                  name="selectedText"
                  checked={text.selected}
                  onChange={() => selectText(text.id)}
                  className="radio radio-success mt-1"
                />
                <p className="text-sm flex-1">{text.text}</p>
              </label>
              <button
                onClick={() => removeText(text.id)}
                className="btn btn-ghost btn-sm"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}