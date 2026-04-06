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
            { name: "Instagram", href: "https://instagram.com/edwardhrnndz" },
            { name: "Twitter", href: "https://twitter.com/edwftsh" },
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
