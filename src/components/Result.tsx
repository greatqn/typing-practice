import { RepeatIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ErrorStats {
    count: number;
    characters: { [key: string]: number };
}

export default function Result({ 
    accuracy, 
    wpm, 
    errorStats 
}: { 
    accuracy: number, 
    wpm: number,
    errorStats: ErrorStats 
}) {
    let status: string;
    let emoji: string;

    if (accuracy >= 90 && wpm >= 60) {
        status = "太棒了!";
        emoji = "🎉";
    } else if (accuracy >= 80 && wpm >= 50) {
        status = "做得好!";
        emoji = "👍";
    } else if (accuracy >= 70 && wpm >= 40) {
        status = "继续加油!";
        emoji = "😊";
    } else {
        status = "需要练习!";
        emoji = "💪";
    }

    // 格式化错误字符显示
    const formatChar = (char: string) => {
        switch (char) {
            case ' ':
                return '[空格键]';
            case '\n':
                return '[回车键]';
            case '\t':
                return '[Tab键]';
            default:
                return char;
        }
    };

    return (
        <div className="min-h-screen bg-base-100 dark:bg-base-300 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-8 text-center">
                    <div className="text-6xl mb-4">{emoji}</div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{status}</h2>
                    
                    <div className="space-y-4 mb-8">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg">准确率: <span className="font-bold text-success">{accuracy}%</span></p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg">WPM: <span className="font-bold text-success">{wpm}</span></p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg">错误次数: <span className="font-bold text-error">{errorStats.count}</span></p>
                            {errorStats.count > 0 && (
                                <div className="mt-2">
                                    <h3 className="text-sm font-medium mb-2">最容易输错的字符:</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(errorStats.characters)
                                            .sort(([,a], [,b]) => b - a)
                                            .slice(0, 6)
                                            .map(([char, count]) => (
                                                <div key={char} className="bg-gray-100 dark:bg-gray-600 p-2 rounded">
                                                    <span className="font-mono">{formatChar(char)}</span>: {count}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <Link to="/" className="block w-full">
                        <button 
                            className="btn btn-success w-full flex items-center justify-center gap-2"
                        >
                            <RepeatIcon className="w-5 h-5" />
                            重新开始
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
