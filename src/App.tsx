import { ChangeEvent, useState } from "react";
import { useSentenceStore } from "./store/sentenceStore";
import { Link } from "@tanstack/react-router";
import { useCustomTextStore } from "./store/customTextStore";
import CustomTextManager from "./components/CustomTextManager";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('physics')
  const [eclipsedTime, setEclipsedTime] = useState(60)
  const { texts } = useCustomTextStore()

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTopic(value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setEclipsedTime(value);
  };

  const { getAllTopics } = useSentenceStore();
  const topics = getAllTopics();
  const { sentences } = useSentenceStore()

  // 检查是否有选中的自定义文本
  const hasSelectedCustomText = texts.some(t => t.selected);
  const isCustomTextDisabled = selectedTopic === 'custom' && (!texts.length || !hasSelectedCustomText);

  return (
    <div className="flex-1 bg-base-100 dark:bg-base-300">
      <div className="container mx-auto max-w-3xl w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl  text-center mb-8 text-gray-900 dark:text-white">
            提升你的打字技能
          </h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择主题
              </label>
              <select 
                value={selectedTopic} 
                onChange={handleSelectChange} 
                className="select select-success w-full bg-white dark:bg-gray-700"
              >
                <option value="" disabled>选择你喜欢的主题</option>
                <option value="custom">自定义文本</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic} ({sentences.filter(sen => sen.topic === topic).length})
                  </option>
                ))}
              </select>
            </div>

            {selectedTopic === 'custom' && (
              <CustomTextManager />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择时间: {eclipsedTime}秒
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="15"
                  max="180"
                  step="5"
                  value={eclipsedTime}
                  onChange={handleTimeChange}
                  className="range range-success range-sm flex-1"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 w-20 text-right">
                  {Math.floor(eclipsedTime / 60)}:{(eclipsedTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <Link 
              to='/practice' 
              search={{ topic: selectedTopic, eclipsedTime: eclipsedTime }}
              className="block w-full"
            >
              <button 
                className="btn btn-success w-full"
                disabled={isCustomTextDisabled}
              >
                开始练习
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}