"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "ATLAS", href: "/atlas" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

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
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-subheading text-[0.88rem] transition-colors duration-200 ${
                      isActive ? "font-semibold text-deepNavy" : "text-slateText hover:text-metallicGold"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-metallicGold"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/enforcement-lessons"
              className={`font-subheading text-sm transition-colors hover:text-metallicGold ${
                pathname === "/enforcement-lessons" ? "font-semibold text-deepNavy" : "text-deepNavy"
              }`}
            >
              Enforcement Lessons
            </Link>
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
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="font-heading text-[1.8rem] text-warmCream transition-colors hover:text-luminousGold"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
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
