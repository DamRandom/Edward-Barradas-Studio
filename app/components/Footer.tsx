export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10">
      <div
        className="
          max-w-7xl mx-auto
          px-6 py-10
          flex flex-col md:flex-row
          items-center justify-between
          gap-6
        "
      >
        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          © {new Date().getFullYear()} Edward Barradas
        </p>

        {/* Social links */}
        <ul
          className="
            flex flex-wrap items-center
            gap-6
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-gray-500
          "
        >
          <li>
            <a
              href="https://instagram.com/edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>
          </li>

          <li>
            <a
              href="https://facebook.com/edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Facebook
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Twitter
            </a>
          </li>

          <li>
            <a
              href="https://tumblr.com/edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Tumblr
            </a>
          </li>

          <li>
            <a
              href="https://onlyfans.com/edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              OnlyFans
            </a>
          </li>

          <li>
            <a
              href="https://tiktok.com/@edwardbarradas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              TikTok
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
