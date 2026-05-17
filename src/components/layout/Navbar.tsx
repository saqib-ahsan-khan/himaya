"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "ATLAS", href: "/atlas" },
  { label: "Industries", href: "/industries" },
];

const resourceLinks = [
  { label: "FCA Regulatory Insights", href: "/fca-insights" },
  { label: "Control Drift Checklist", href: "/#control-drift-checklist" },
];

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <li>
      <Link
        href={href}
        className={`relative font-subheading text-[0.88rem] transition-colors duration-200 ${
          isActive ? "font-semibold text-deepNavy" : "text-slateText hover:text-metallicGold"
        }`}
      >
        {label}
        {isActive && <motion.span layoutId="nav-active-underline" className="absolute -bottom-1 left-0 h-0.5 w-full bg-metallicGold" />}
      </Link>
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const resourcesActive = pathname === "/resources" || pathname.startsWith("/fca-insights");

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingTop: isScrolled ? "0.75rem" : "1.15rem",
          paddingBottom: isScrolled ? "0.75rem" : "1.15rem",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255,255,255,0)",
          borderBottomColor: isScrolled ? "rgba(212,160,23,0.15)" : "rgba(212,160,23,0)",
          boxShadow: isScrolled ? "0 1px 20px rgba(7,24,39,0.08)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 z-50 w-full border-b backdrop-blur-md"
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <picture>
              <source srcSet="/assets/images/logos/himaya-logo.png" type="image/png" />
              <img
                src="/assets/images/logos/himaya-logo.svg"
                alt="HIMAYA logo"
                width={240}
                height={64}
                className="h-14 w-auto max-w-[240px] object-contain"
              />
            </picture>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}

            <li ref={resourcesRef} className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen((o) => !o)}
                className={`inline-flex items-center gap-1 font-subheading text-[0.88rem] transition-colors ${
                  resourcesActive ? "font-semibold text-deepNavy" : "text-slateText hover:text-metallicGold"
                }`}
              >
                Resources
                <ChevronDown size={14} className={`transition ${resourcesOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {resourcesOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-lg border border-deepNavy/10 bg-white py-2 shadow-lg">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setResourcesOpen(false)}
                      className="block px-4 py-2 text-sm text-slateText transition hover:bg-metallicGold/5 hover:text-metallicGold"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/resources"
                    onClick={() => setResourcesOpen(false)}
                    className="block border-t border-deepNavy/5 px-4 py-2 text-sm text-mutedText transition hover:text-metallicGold"
                  >
                    All Resources
                  </Link>
                </div>
              )}
            </li>

            <NavLink href="/fca-insights" label="FCA Insights" pathname={pathname} />
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <BookDemoTrigger className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-5 py-2.5 font-subheading text-sm font-bold text-deepNavy transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(212,160,23,0.35)]">
              Book a Demo
            </BookDemoTrigger>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              className="absolute h-0.5 w-6 bg-metallicGold"
            />
            <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="absolute h-0.5 w-6 bg-metallicGold" />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              className="absolute h-0.5 w-6 bg-metallicGold"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-deepNavy/95 p-8 pt-28 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-full flex-col justify-between"
            >
              <ul className="space-y-5">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link href={item.href} onClick={closeMenu} className="font-heading text-[1.8rem] text-warmCream transition-colors hover:text-luminousGold">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.08 }}>
                  <p className="font-mono text-xs tracking-[0.2em] text-metallicGold">Resources</p>
                  <ul className="mt-3 space-y-3 pl-2">
                    {resourceLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} onClick={closeMenu} className="font-heading text-2xl text-warmCream/90 hover:text-luminousGold">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + 1) * 0.08 }}>
                  <Link href="/fca-insights" onClick={closeMenu} className="font-heading text-[1.8rem] text-warmCream transition-colors hover:text-luminousGold">
                    FCA Insights
                  </Link>
                </motion.li>
              </ul>

              <BookDemoTrigger
                onClick={closeMenu}
                className="w-full rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-5 py-3 text-center font-subheading font-bold text-deepNavy"
              >
                Book a Demo
              </BookDemoTrigger>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
