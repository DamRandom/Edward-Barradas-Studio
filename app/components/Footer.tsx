import Image from "next/image";
import { SOCIAL_LINKS, SITE_META } from "@/app/constants/site";
import { SocialIcon } from "./ui/SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-black/8 py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image
            src="/images/logo1.png"
            alt="Edward Barradas"
            width={300}
            height={100}
            className="h-10 w-auto object-contain opacity-85"
          />
          <span className="text-[8px] uppercase tracking-[0.4em] text-foreground/35">
            {SITE_META.tagline}
          </span>
        </div>

        {/* Social links */}
        <ul className="flex items-center gap-8 text-[9px] uppercase tracking-[0.38em] text-foreground/45">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground text-foreground/45 transition-colors duration-300 block p-1"
                aria-label={social.label}
              >
                <SocialIcon name={social.label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-[9px] uppercase tracking-[0.35em] text-foreground/35">
          © {new Date().getFullYear()} Edward Barradas · Todos los Derechos Reservados
        </p>
      </div>
    </footer>
  );
}