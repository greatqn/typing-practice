import { ClockIcon } from "lucide-react"

export default function Timer({ time, remainingTime }: { time: number, remainingTime: number }) {
    return (
        <div className="rounded w-full border border-success p-2 flex items-center gap-2 justify-between text-success">
            <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>{time}</span>
            </div>
            {remainingTime > 0 && (
                <span className="text-sm">剩余: {remainingTime}s</span>
            )}
        </div>
    )
}
