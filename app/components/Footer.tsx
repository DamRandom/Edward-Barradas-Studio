export default function Footer() {
  return (
    <footer className="bg-background border-t border-black/[0.08] py-10 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <p className="font-serif text-sm text-foreground/50 tracking-wide italic">
          Edward Barradas Studio
        </p>

        {/* Social links */}
        <ul className="flex items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-foreground/40">
          {[
            { name: "Instagram", href: "https://instagram.com/fragmentsofed" },
            { name: "Twitter", href: "https://twitter.com/Edwardhrnndz" },
            { name: "WhatsApp", href: "https://wa.me/51910280429" },
          ].map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/80 transition-colors duration-300"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-[9px] uppercase tracking-[0.35em] text-foreground/30">
          © {new Date().getFullYear()} Edward Barradas
        </p>
      </div>
    </footer>
  );
}
