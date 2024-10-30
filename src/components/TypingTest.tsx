import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Timer from './Timer';
import Result from './Result';
import KeyboardLayout from './KeyboardLayout';
import SpeedChart from './SpeedChart';
import calculateAccuracy from '../lib/compare';

// 只保留错误音效
const errorSound = new Audio('/sounds/error.mp3');

interface SpeedDataPoint {
  time: number;
  wpm: number;
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
    const [speedData, setSpeedData] = useState<SpeedDataPoint[]>([]);
    const [showError, setShowError] = useState(false);

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

        // 检查最后输入的字符是否正确
        const isCorrect = newInput.slice(-1) === textToPractice[newInput.length - 1];
        
        if (!isCorrect) {
            errorSound.play();
            setShowError(true);
            setTimeout(() => setShowError(false), 500);
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
            // Letter not yet entered
            return <span key={index}>{letter}</span>;
        } else if (letter === enteredLetter) {
            // Correctly entered letter
            return <span key={index} className="text-green-500 md:text-2xl">{letter}</span>;
        } else {
            // Incorrectly entered letter
            return <span key={index} className="text-red-500 md:text-2xl">{letter}</span>;
        }
    };

    if (isSubmitted) {
        return <Result wpm={wpm} accuracy={accuracy} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                    <p className={`p-4 border dark:border-gray-700 rounded-lg text-lg md:text-xl leading-relaxed select-none ${
                        showError ? 'animate-shake' : ''
                    }`}>
                        {textToPractice.split('').map((_, index) => renderLetter(index))}
                    </p>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <Timer time={timer} />
                        <div className='p-3 rounded-lg border-success border text-success'>
                            <p>准确率: <span>{accuracy}%</span></p>
                        </div>
                        <div className='p-3 rounded-lg border-success border text-success'>
                            <p>WPM: <span>{wpm}</span></p>
                        </div>
                    </div>

                    <SpeedChart speedData={speedData} />
                    
                    <KeyboardLayout pressedKey={lastPressedKey} />

                    <textarea
                        disabled={!isStarted}
                        onChange={handleInputChange}
                        className="w-full p-4 textarea rounded-lg textarea-bordered text-lg md:text-xl bg-gray-50 dark:bg-gray-700"
                        placeholder="在此输入..."
                    />

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
