import { TypeIcon } from "lucide-react"

export default function Footer() {
    return (
        <>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <p className="text-sm text-center">
            Copyright © {new Date().getFullYear()} - All right reserved by <a href="https://bento.me/wincatcher" className="link link-hover text-blue-500" target="_blank" rel="noopener noreferrer">风巢森淼</a>
          </p>
            </footer>
        </>
    )
}
