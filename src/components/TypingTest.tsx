import { ChangeEvent, useCallback, useEffect, useState, KeyboardEvent } from 'react';
import Timer from './Timer';
import Result from './Result';
import KeyboardLayout from './KeyboardLayout';
import SpeedChart from './SpeedChart';
import calculateAccuracy from '../lib/compare';
import { VolumeX, Volume2 } from 'lucide-react';

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
    const [fontSize, setFontSize] = useState('medium');
    const [lineHeight, setLineHeight] = useState('normal');

    // 计算进度百分比
    const progress = Math.floor((userInput.length / textToPractice.length) * 100);
    
    // 计算剩余时间
    const remainingTime = eclipsedTime - timer;

    // 处理键盘快捷键
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Escape') {
            window.location.reload();
        }
        if (e.key === ' ' && !isStarted) {
            e.preventDefault();
            setIsStarted(true);
        }
    };

    // 更新错误统计
    const updateErrorStats = (wrongChar: string) => {
        setErrorStats(prev => ({
            count: prev.count + 1,
            characters: {
                ...prev.characters,
                [wrongChar]: (prev.characters[wrongChar] || 0) + 1
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

    useEffect(() => {
        if (isStarted && !isSubmitted) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer + 1;
                    // 更新速度数据
                    const currentWPM = Math.round(userInput.split(' ').length / (newTimer / 60));
                    setSpeedData(prev => [...prev, { time: newTimer, wpm: currentWPM }]);
                    return newTimer;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isStarted, isSubmitted, userInput]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newInput = e.target.value;
        setUserInput(newInput);
        setLastPressedKey(newInput.slice(-1));
        
        // 设置下一个要打的字母
        setNextKey(textToPractice[newInput.length] || '');

        // 检查最后输入的字符是否正确
        const isCorrect = newInput.slice(-1) === textToPractice[newInput.length - 1];
        
        if (!isCorrect) {
            if (soundEnabled) {
                errorSound.play();
            }
            setShowError(true);
            setTimeout(() => setShowError(false), 500);
            updateErrorStats(newInput.slice(-1));
        }
    };

    useEffect(() => {
        if (isStarted && !isSubmitted) {
            const wordPerMinute = Math.round(userInput.split(' ').length / (timer / 60));
            setWpm(Number.isFinite(wordPerMinute) ? wordPerMinute : 0);

            const slicedText = userInput.length <= textToPractice.length ? textToPractice.slice(0, userInput.length) : textToPractice;
            const accuracy = calculateAccuracy(slicedText, userInput);
            setAccuracy(Number.isFinite(parseInt(accuracy)) ? parseInt(accuracy) : 0);
        }
    }, [textToPractice, timer, userInput, isStarted, isSubmitted]);

    const handleSubmit = useCallback(() => {
        if (!isStarted) {
            setIsStarted(true);
            return;
        }

        const wordPerMinute = Math.round(userInput.split(' ').length / (timer / 60));
        setWpm(Number.isFinite(wordPerMinute) ? wordPerMinute : 0);

        const slicedText = userInput.length <= textToPractice.length ? textToPractice.slice(0, userInput.length) : textToPractice;
        const accuracy = calculateAccuracy(slicedText, userInput);
        setAccuracy(Number.isFinite(parseInt(accuracy)) ? parseInt(accuracy) : 0);

        setIsSubmitted(true);
    }, [isStarted, textToPractice, timer, userInput]);

    useEffect(() => {
        if (!(eclipsedTime === 0) && timer === eclipsedTime) {
            handleSubmit();
            setIsSubmitted(true);
        }
    }, [eclipsedTime, handleSubmit, timer])

    const renderLetter = (index: number) => {
        const letter = textToPractice[index];
        const enteredLetter = userInput[index];

        if (enteredLetter === undefined) {
            // 未输入的字母
            return <span key={index} className="md:text-2xl">{letter}</span>;
        } else if (letter === enteredLetter) {
            // 正确输入的字母
            return <span key={index} className="text-green-500 md:text-2xl">{letter}</span>;
        } else {
            // 错误输入的字母
            return <span key={index} className="text-red-500 md:text-2xl">{letter}</span>;
        }
    };

    if (isSubmitted) {
        return <Result 
            wpm={wpm} 
            accuracy={accuracy} 
            errorStats={errorStats}
        />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="progress-bar w-1/2 bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-success h-2.5 rounded-full" 
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

                    <div className="flex gap-4 mb-4">
                        <select 
                            value={fontSize} 
                            onChange={(e) => setFontSize(e.target.value)}
                            className="select select-bordered select-sm"
                        >
                            <option value="small">小字体</option>
                            <option value="medium">中字体</option>
                            <option value="large">大字体</option>
                        </select>
                        <select 
                            value={lineHeight} 
                            onChange={(e) => setLineHeight(e.target.value)}
                            className="select select-bordered select-sm"
                        >
                            <option value="tight">紧凑</option>
                            <option value="normal">正常</option>
                            <option value="relaxed">宽松</option>
                        </select>
                    </div>

                    <p className={`p-4 border dark:border-gray-700 rounded-lg text-lg md:text-xl leading-${lineHeight} text-${fontSize} ${
                        showError ? 'animate-shake' : ''
                    }`}>
                        {textToPractice.split('').map((_, index) => renderLetter(index))}
                    </p>
                    
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

                    <textarea
                        disabled={!isStarted}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full p-4 textarea rounded-lg textarea-bordered text-lg md:text-xl bg-gray-50 dark:bg-gray-700"
                        placeholder="在此输入... (按空格开始)"
                    />

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
