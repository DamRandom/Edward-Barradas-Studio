import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-black/[0.08] py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image
            src="/images/logo.png"
            alt="Edward Barradas"
            width={300}
            height={100}
            className="h-10 w-auto object-contain opacity-85"
          />
          <span className="text-[8px] uppercase tracking-[0.4em] text-foreground/35">
            Photography & Editorial Studio
          </span>
        </div>

        {/* Social links */}
        <ul className="flex items-center gap-8 text-[9px] uppercase tracking-[0.38em] text-foreground/45">
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
                className="hover:text-foreground transition-colors duration-300 relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-[9px] uppercase tracking-[0.35em] text-foreground/35">
          © {new Date().getFullYear()} Edward Barradas · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}