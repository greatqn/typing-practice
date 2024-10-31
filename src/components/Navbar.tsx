import { Link } from "@tanstack/react-router";
import ModeToggle from "./ModeToggle";
import { GithubIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-base-100 dark:bg-base-300 dark:border-b dark:border-b-gray-700 justify-between p-4 shadow">
      <Link to='/' className="text-success">在线英文打字练习</Link>
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
