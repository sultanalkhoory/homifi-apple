'use client';

import Link from 'next/link';
import WorksWithFooter from './WorksWithFooter';

/**
 * Footer Component
 * 
 * The main site footer that incorporates the WorksWithFooter component
 * along with standard footer elements like navigation, copyright, and legal links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Works With badges section */}
      <WorksWithFooter />

      {/* Main footer content */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          {/* Top footer section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and tagline */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block">
                <img src="/homifi-logo.png" alt="HomiFi" className="h-8" />
              </Link>
              <p className="mt-4 text-gray-500 text-sm max-w-xs">
                Apple-first integration for lighting, privacy, climate, and security — 
                designed to feel invisible until you need it.
              </p>
            </div>
            
            {/* Quick links */}
            <div>
              <h3 className="font-medium text-sm mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-500 text-sm hover:text-black">Features</Link></li>
                <li><Link href="#works" className="text-gray-500 text-sm hover:text-black">How it Works</Link></li>
                <li><Link href="#ecosystem" className="text-gray-500 text-sm hover:text-black">Ecosystem</Link></li>
                <li><Link href="#pricing" className="text-gray-500 text-sm hover:text-black">Pricing</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-medium text-sm mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><Link href="#contact" className="text-gray-500 text-sm hover:text-black">Get in Touch</Link></li>
                <li><Link href="#support" className="text-gray-500 text-sm hover:text-black">Support</Link></li>
                <li><a href="mailto:info@homifi.com" className="text-gray-500 text-sm hover:text-black">info@homifi.com</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom footer - legal and copyright */}
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              &copy; {currentYear} HomiFi. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 text-xs hover:text-gray-600">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 text-xs hover:text-gray-600">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 text-xs hover:text-gray-600">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
