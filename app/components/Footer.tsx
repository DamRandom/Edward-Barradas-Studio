export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10">
      <div
        className="
          max-w-7xl mx-auto
          px-6 py-8
          flex flex-col md:flex-row
          items-center justify-between
          gap-8
        "
      >
        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">
          © {new Date().getFullYear()} Edward Barradas
        </p>

        {/* Social links */}
        <ul
          className="
            flex flex-wrap items-center justify-center
            gap-x-6 gap-y-3
            text-[10px]
            uppercase
            tracking-[0.4em]
            text-gray-400
          "
        >
          {[
            { name: "Instagram", href: "https://instagram.com/edwardbarradas" },
            { name: "Facebook", href: "https://facebook.com/edwardbarradas" },
            { name: "Twitter", href: "https://twitter.com/edwardbarradas" },
            { name: "Tumblr", href: "https://tumblr.com/edwardbarradas" },
            { name: "OnlyFans", href: "https://onlyfans.com/edwardbarradas" },
            { name: "TikTok", href: "https://tiktok.com/@edwardbarradas" },
          ].map((social) => (
            <li key={social.name} className="relative">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  transition-colors
                  hover:text-black
                "
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
