'use client';
import Link from "next/link";

/**
 * Header Component
 * 
 * Apple-style frosted glass navigation with responsive behavior:
 * - Desktop: Full horizontal nav with links and refined CTA
 * - Mobile: Hamburger menu with simplified controls
 * 
 * Design Philosophy:
 * - Fixed at top with subtle offset for breathing room
 * - Frosted glass effect (backdrop-blur) for premium feel
 * - Minimal and clean - lets content shine
 * - CTA is subtle (white with border) - not competing with hero
 * 
 * The header is fixed at the top with z-index to ensure it stays above 
 * all content while scrolling, with a slight top-6 offset to create 
 * visual breathing room.
 */
export default function Header() {
  return (
    <header className="fixed top-6 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* 
          Frosted Glass Navigation Container
          - Rounded-full pill shape (modern, friendly)
          - Frosted glass effect with backdrop-blur
          - Semi-transparent white background
          - Subtle border for definition
          - Horizontal flex layout with proper spacing
        */}
        <div className="frosted rounded-full flex items-center gap-2 px-3 py-2">
          
          {/* 
            Logo / Brand
            - Left-aligned
            - Links to home page
            - Includes HomiFi logo image
            - Padding for comfortable tap target
          */}
          <Link href="#" className="pl-2 flex items-center gap-2">
            <img src="/homifi-logo.png" alt="HomiFi" className="h-7" />
          </Link>
          
          {/* 
            Main Navigation Links
            - Centered horizontally (mx-auto)
            - Hidden on mobile (md:flex)
            - Even spacing between links
            - Hover state darkens text
            - Links to main sections via anchor tags
          */}
          <nav className="mx-auto hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-black transition-colors duration-200">
              Features
            </a>
            <a href="#works" className="hover:text-black transition-colors duration-200">
              Works
            </a>
            <a href="#ecosystem" className="hover:text-black transition-colors duration-200">
              Ecosystem
            </a>
            <a href="#pricing" className="hover:text-black transition-colors duration-200">
              Pricing
            </a>
          </nav>
          
          {/* 
            Desktop CTA Button - "Get Started"
            - Right-aligned (ml-auto)
            - Hidden on mobile (hidden md:inline-flex)
            - White background with subtle border (refined, secondary style)
            - Black text for contrast
            - Rounded-full to match navigation pill
            - Smooth hover states (slight scale and shadow)
            - Intentionally subtle - hero CTA is the primary action
          */}
          <a 
            href="#contact" 
            className="ml-auto hidden md:inline-flex items-center rounded-full 
              bg-white border border-black/20 text-black text-sm px-4 py-2
              hover:bg-gray-50 hover:border-black/30 hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200 ease-out
              shadow-sm hover:shadow-md"
          >
            Get Started
          </a>
          
          {/* 
            Mobile Menu Button (Hamburger)
            - Only visible on mobile (md:hidden)
            - Right-aligned (ml-auto)
            - Black circular button with hamburger icon
            - aria-label for accessibility
            - TODO: Connect to mobile menu drawer/dropdown
          */}
          <button 
            aria-label="Menu" 
            className="md:hidden ml-auto inline-flex items-center justify-center 
              rounded-full w-10 h-10 bg-black text-white
              hover:bg-gray-900 active:scale-95
              transition-all duration-200"
          >
            ≡
          </button>
        </div>
      </div>
    </header>
  );
}
