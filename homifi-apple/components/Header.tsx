'use client';
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-6 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="frosted rounded-full flex items-center gap-2 px-3 py-2">
          <Link href="#" className="pl-2 flex items-center gap-2">
            <img src="/homifi-logo.png" alt="HomiFi" className="h-7" />
          </Link>
          <nav className="mx-auto hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-black">Features</a>
            <a href="#works" className="hover:text-black">Works</a>
            <a href="#ecosystem" className="hover:text-black">Ecosystem</a>
            <a href="#pricing" className="hover:text-black">Pricing</a>
          </nav>
          <a href="#contact" className="ml-auto hidden md:inline-flex items-center rounded-full bg-black text-white text-sm px-4 py-2">Get Started</a>
          <button aria-label="Menu" className="md:hidden ml-auto inline-flex items-center justify-center rounded-full w-10 h-10 bg-black text-white">≡</button>
        </div>
      </div>
    </header>
  );
}