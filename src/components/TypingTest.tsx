import { ChangeEvent, useCallback, useEffect, useState, KeyboardEvent } from 'react';
import Timer from './Timer';
import Result from './Result';
import KeyboardLayout from './KeyboardLayout';
import SpeedChart from './SpeedChart';
import calculateAccuracy from '../lib/compare';
import { VolumeX, Volume2 } from 'lucide-react';
import React from 'react';

// 只保留错误音效
const errorSound = new Audio('/sounds/error.mp3');

interface SpeedDataPoint {
  time: number;
  wpm: number;
}

interface ErrorStats {
  count: number;
  characters: { [key: string]: number };
}

export default function TypingTest({ text, eclipsedTime }: { text: string, eclipsedTime: number }) {
    const [userInput, setUserInput] = useState('');
    const [timer, setTimer] = useState<number>(0);
    const [isStarted, setIsStarted] = useState(false);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [wpm, setWpm] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [reload, setReload] = useState(false);
    const [textToPractice, setTextToPractice] = useState(text);
    const [lastPressedKey, setLastPressedKey] = useState('');
    const [nextKey, setNextKey] = useState(text[0] || '');
    const [speedData, setSpeedData] = useState<SpeedDataPoint[]>([]);
    const [showError, setShowError] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [errorStats, setErrorStats] = useState<ErrorStats>({ count: 0, characters: {} });
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [textAreaHeight, setTextAreaHeight] = useState('200px');

    // 计算进度百分比
    const progress = Math.floor((userInput.length / textToPractice.length) * 100);
    
    // 计算剩余时间
    const remainingTime = eclipsedTime - timer;

    // 处理键盘快捷键
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Escape') {
            window.location.reload();
        }
        if ((e.key === ' ' || e.key.length === 1) && !isStarted) {
            setIsStarted(true);
        }
    };

    // 更新错误统计
    const updateErrorStats = (index: number, wrongChar: string) => {
        const correctChar = textToPractice[index];
        setErrorStats(prev => ({
            count: prev.count + 1,
            characters: {
                ...prev.characters,
                [correctChar]: (prev.characters[correctChar] || 0) + 1
            }
        }));
    };

    useEffect(() => {
        if (reload) {
            setTextToPractice(textToPractice + " " + text);
            setReload(false)
        }
    }, [reload, textToPractice, text])

    useEffect(() => {
        const isReload = userInput.length === textToPractice.length;
        if (isReload) {
            setReload(true)
        }
    }, [reload, textToPractice.length, userInput.length])

    // 修改计时器逻辑
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        
        if (isStarted && !isSubmitted) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = prevTimer + 1;
                    // 计算当前的 WPM
                    const words = userInput.trim().split(/\s+/).length;
                    const minutes = newTimer / 60;
                    const currentWPM = Math.round(words / minutes) || 0;
                    
                    // 更新速度数据
                    setSpeedData(prev => [...prev, { 
                        time: newTimer,
                        wpm: currentWPM 
                    }]);
                    return newTimer;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isStarted, isSubmitted]);

    // 单独处理 WPM 更新
    useEffect(() => {
        if (isStarted && !isSubmitted) {
            const words = userInput.trim().split(/\s+/).length;
            const minutes = timer / 60;
            const currentWPM = Math.round(words / minutes) || 0;
            
            setSpeedData(prev => {
                const lastPoint = prev[prev.length - 1];
                if (lastPoint && lastPoint.time === timer) {
                    return prev.slice(0, -1).concat({ time: timer, wpm: currentWPM });
                }
                return prev;
            });
        }
    }, [userInput, timer, isStarted, isSubmitted]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newInput = e.target.value;
        setUserInput(newInput);
        setLastPressedKey(newInput.slice(-1));
        setNextKey(textToPractice[newInput.length] || '');

        const isCorrect = newInput.slice(-1) === textToPractice[newInput.length - 1];
        
        if (!isCorrect) {
            if (soundEnabled) {
                errorSound.play();
            }
            setShowError(true);
            setTimeout(() => setShowError(false), 500);
            updateErrorStats(newInput.length - 1, newInput.slice(-1));
        }
    };

    useEffect(() => {
        if (isStarted && !isSubmitted) {
            const wordPerMinute = Math.round(userInput.split(' ').length / (timer / 60));
            setWpm(Number.isFinite(wordPerMinute) ? wordPerMinute : 0);

            const totalChars = userInput.length;
            const errorCount = errorStats.count;
            const accuracyPercentage = totalChars > 0 
                ? Math.max(0, 100 - (errorCount / totalChars * 100))
                : 100;
                
            setAccuracy(Math.round(accuracyPercentage));
        }
    }, [textToPractice, timer, userInput, isStarted, isSubmitted, errorStats.count]);

    const handleSubmit = useCallback(() => {
        if (!isStarted) {
            setIsStarted(true);
            return;
        }

        const wordPerMinute = Math.round(userInput.split(' ').length / (timer / 60));
        setWpm(Number.isFinite(wordPerMinute) ? wordPerMinute : 0);

        const slicedText = userInput.length <= textToPractice.length ? textToPractice.slice(0, userInput.length) : textToPractice;
        const accuracy = calculateAccuracy(slicedText, errorStats.count);
        setAccuracy(Number.isFinite(parseInt(accuracy)) ? parseInt(accuracy) : 0);

        setIsSubmitted(true);
    }, [isStarted, textToPractice, timer, userInput, errorStats.count]);

    useEffect(() => {
        if (!(eclipsedTime === 0) && timer === eclipsedTime) {
            handleSubmit();
            setIsSubmitted(true);
        }
    }, [eclipsedTime, handleSubmit, timer])

    const renderLetter = (index: number) => {
        const letter = textToPractice[index];
        const enteredLetter = userInput[index];
        
        let className = "text-gray-700 dark:text-gray-300";
        if (enteredLetter !== undefined) {
            className = letter === enteredLetter ? "text-green-500" : "text-red-500";
        }
        
        // 处理换行符
        if (letter === '\n') {
            return (
                <React.Fragment key={index}>
                    <br />
                </React.Fragment>
            );
        }
        
        return <span key={index} className={className}>{letter}</span>;
    };

    useEffect(() => {
        const baseHeight = 200;
        const heightMultiplier = fontSize / 16 * lineHeight;
        const newHeight = `${baseHeight * heightMultiplier}px`;
        setTextAreaHeight(newHeight);
    }, [fontSize, lineHeight]);

    if (isSubmitted) {
        return <Result wpm={wpm} accuracy={accuracy} errorStats={errorStats} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="progress-bar w-3/4 mx-auto bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-success h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="btn btn-ghost btn-circle"
                        >
                            {soundEnabled ? <Volume2 /> : <VolumeX />}
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="w-full max-w-md flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">字体大小: {fontSize}px</span>
                                <input
                                    type="range"
                                    min="12"
                                    max="24"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="range range-success range-sm w-2/3"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">行高: {lineHeight}</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="2"
                                    step="0.1"
                                    value={lineHeight}
                                    onChange={(e) => setLineHeight(Number(e.target.value))}
                                    className="range range-success range-sm w-2/3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div 
                            className={`overflow-y-auto p-4 border dark:border-gray-700 rounded-lg ${
                                showError ? 'animate-shake' : ''
                            }`}
                            style={{ 
                                fontSize: `${fontSize}px`,
                                lineHeight: lineHeight,
                                height: textAreaHeight,
                                width: '100%'
                            }}
                        >
                            {textToPractice.split('').map((_, index) => renderLetter(index))}
                        </div>

                        <textarea
                            disabled={!isStarted}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full p-4 textarea rounded-lg textarea-bordered bg-gray-50 dark:bg-gray-700 resize-none"
                            placeholder="在此输入... (按任意键开始)"
                            style={{ 
                                fontSize: `${fontSize}px`,
                                lineHeight: lineHeight,
                                height: textAreaHeight
                            }}
                        />
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                        <Timer time={timer} remainingTime={remainingTime} />
                        <div className='p-3 rounded-lg border-success border text-success'>
                            <p>准确率: <span>{accuracy}%</span></p>
                        </div>
                        <div className='p-3 rounded-lg border-success border text-success'>
                            <p>WPM: <span>{wpm}</span></p>
                        </div>
                        <div className='p-3 rounded-lg border-success border text-success'>
                            <p>错误: <span>{errorStats.count}</span></p>
                        </div>
                    </div>

                    <KeyboardLayout pressedKey={lastPressedKey} nextKey={nextKey} />

                    <SpeedChart speedData={speedData} />

                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 btn btn-success"
                        >
                            {isStarted ? '提交' : '开始'}
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 btn btn-outline btn-success"
                        >
                            重置
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
