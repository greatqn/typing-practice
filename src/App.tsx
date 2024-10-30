import { ChangeEvent, useState } from "react";
import { useSentenceStore } from "./store/sentenceStore";
import { Link } from "@tanstack/react-router";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('physics')
  const [eclipsedTime, setEclipsedTime] = useState(60)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTopic(value);
  };

  const handleEclipsedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setEclipsedTime(parseInt(value));
  };

  const { getAllTopics } = useSentenceStore();
  const topics = getAllTopics();
  const { sentences } = useSentenceStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            提升你的打字技能
          </h1>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {topics.map(topic => (
                    <option key={topic} value={topic}>
                      {topic} ({sentences.filter(sen => sen.topic === topic).length})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择时间
                </label>
                <select 
                  value={eclipsedTime} 
                  onChange={handleEclipsedChange} 
                  className="select select-success w-full bg-white dark:bg-gray-700"
                >
                  <option value="" disabled>选择时间限制</option>
                  <option value={30}>30秒</option>
                  <option value={60}>60秒</option>
                  <option value={120}>120秒</option>
                  <option value={0}>无限制</option>
                </select>
              </div>
            </div>

            <Link 
              to='/practice' 
              search={{ topic: selectedTopic, eclipsedTime: eclipsedTime }}
              className="block w-full"
            >
              <button className="btn btn-success w-full">
                开始练习
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}