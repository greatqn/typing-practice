import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="footer p-4 bg-base-300 text-base-content mt-auto">
      <div className="container mx-auto flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/about-us" className="link link-hover">
            关于我们
          </Link>
          <Link to="/terms-and-conditions" className="link link-hover">
            使用条款
          </Link>
          <Link to="/privacy" className="link link-hover">
            隐私政策
          </Link>
        </div>
        <div className="text-center">
          <p className="text-sm flex flex-wrap items-center justify-center gap-1">
            <span>
              Copyright © {new Date().getFullYear()} - All right reserved by
            </span>
            <a
              href="https://bento.me/wincatcher"
              className="link link-hover text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              风巢森淼
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
