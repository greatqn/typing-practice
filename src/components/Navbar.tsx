import { Link } from "@tanstack/react-router";
import ModeToggle from "./ModeToggle";
import { GithubIcon } from "lucide-react";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 dark:bg-base-300/80 border-b border-b-gray-200 dark:border-b-gray-700 flex items-center justify-between p-4 shadow">
      <Link to='/' className="text-success flex items-center gap-2">
        <img src="/favicon-32x32.png" alt="打字练习" className="w-8 h-8" />
        在线英文打字练习
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <a 
          href="https://github.com/wincatcher/typing-practice.toolsnav.top" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <GithubIcon />
        </a>
      </div>
    </nav>
  )
}
