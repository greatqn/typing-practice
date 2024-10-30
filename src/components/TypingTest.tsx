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
        <>
            <section className="p-2 flex flex-col gap-3">
                <p className={`p-2 border dark:border-gray-700 rounded md:text-2xl select-none ${
                    showError ? 'animate-shake' : ''
                }`}>
                    {textToPractice.split('').map((_, index) => renderLetter(index))}
                </p>
                
                <div className='flex items-center gap-2 w-full'>
                    <Timer time={timer} />
                    <div className='p-2 w-full rounded border-success border text-success'>
                        <p>Accuracy : <span>{accuracy}%</span></p>
                    </div>
                    <div className='p-2 w-full rounded border-success border text-success'>
                        <p>WPM : <span>{wpm}</span></p>
                    </div>
                </div>

                <SpeedChart speedData={speedData} />
                
                <KeyboardLayout pressedKey={lastPressedKey} />

                <textarea
                    disabled={!isStarted}
                    onChange={handleInputChange}
                    className="p-2 textarea rounded textarea-bordered text-lg md:text-2xl"
                    title="Text area"
                />

                <button
                    onClick={handleSubmit}
                    className="btn btn-active btn-success"
                >
                    {isStarted ? 'Submit' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        window.location.reload();
                    }}
                    className="btn btn-outline btn-success"
                >
                    {'Reset'}
                </button>
            </section>
        </>
    );
}
