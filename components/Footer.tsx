"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Headphones,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#081329] text-slate-300 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Links Grid (9 Category Columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-6 pb-12 border-b border-slate-800 text-xs">
          {/* Action Cameras */}
          <div>
            <h4 className="font-bold text-white mb-3">Action Cameras</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Action Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">Pocket Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">GoPro Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">DJI Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">DJI Drones</Link></li>
              <li><Link href="#" className="hover:text-white transition">360 Cameras</Link></li>
            </ul>
          </div>

          {/* Cameras */}
          <div>
            <h4 className="font-bold text-white mb-3">Cameras</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">DSLR Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">iPhones</Link></li>
              <li><Link href="#" className="hover:text-white transition">DSLR Gimbal Combos</Link></li>
              <li><Link href="#" className="hover:text-white transition">Wildlife Photography</Link></li>
              <li><Link href="#" className="hover:text-white transition">Tripod & accessories</Link></li>
            </ul>
          </div>

          {/* Trekking Gear */}
          <div>
            <h4 className="font-bold text-white mb-3">Trekking Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Trekking Gear</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trekking Jackets</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trek/Snow Pants</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trekking Shoes</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trek Accessories</Link></li>
            </ul>
          </div>

          {/* Riding Gear */}
          <div>
            <h4 className="font-bold text-white mb-3">Riding Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Riding Gear</Link></li>
              <li><Link href="#" className="hover:text-white transition">Riding Luggage</Link></li>
              <li><Link href="#" className="hover:text-white transition">Riding Jackets</Link></li>
              <li><Link href="#" className="hover:text-white transition">Riding Essentials</Link></li>
              <li><Link href="#" className="hover:text-white transition">Riding Boots</Link></li>
              <li><Link href="#" className="hover:text-white transition">Binoculars</Link></li>
            </ul>
          </div>

          {/* Creator Gear */}
          <div>
            <h4 className="font-bold text-white mb-3">Creator Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Wireless & Collar Mics</Link></li>
              <li><Link href="#" className="hover:text-white transition">Professional Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition">Mirrorless Cameras</Link></li>
              <li><Link href="#" className="hover:text-white transition underline text-blue-400">UNLMTD Vlogging</Link></li>
              <li><Link href="#" className="hover:text-white transition">Mobile Gimbals</Link></li>
              <li><Link href="#" className="hover:text-white transition">Vlogging</Link></li>
            </ul>
          </div>

          {/* Gaming Console */}
          <div>
            <h4 className="font-bold text-white mb-3">Gaming Console</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">PS5 Console</Link></li>
              <li><Link href="#" className="hover:text-white transition">VR</Link></li>
              <li><Link href="#" className="hover:text-white transition">Racing Wheel</Link></li>
              <li><Link href="#" className="hover:text-white transition">Big Screen Gaming</Link></li>
              <li><Link href="#" className="hover:text-white transition">Xbox Console</Link></li>
            </ul>
          </div>

          {/* Winter Wear */}
          <div>
            <h4 className="font-bold text-white mb-3">Winter Wear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Snow Boots</Link></li>
              <li><Link href="#" className="hover:text-white transition">Winter Jackets</Link></li>
              <li><Link href="#" className="hover:text-white transition">Backpacks</Link></li>
            </ul>
          </div>

          {/* Camping Gear */}
          <div>
            <h4 className="font-bold text-white mb-3">Camping Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Camping Gear</Link></li>
              <li><Link href="#" className="hover:text-white transition">Camping Stools & Tables</Link></li>
              <li><Link href="#" className="hover:text-white transition">Camping Tents</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sleeping Bags & Mats</Link></li>
            </ul>
          </div>

          {/* Audio Visual Equipment */}
          <div>
            <h4 className="font-bold text-white mb-3">Audio Visual</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Projectors</Link></li>
              <li><Link href="#" className="hover:text-white transition">VR</Link></li>
              <li><Link href="#" className="hover:text-white transition">Mics</Link></li>
              <li><Link href="#" className="hover:text-white transition">Speakers</Link></li>
            </ul>
          </div>
        </div>

        {/* SEO Text Block */}
        <div className="py-8 border-b border-slate-800 text-xs space-y-4 text-slate-400 leading-relaxed">
          <div>
            <h4 className="font-bold text-white mb-2">Renting from SharePal in Bangalore</h4>
            <p>
              Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you&apos;re exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-1">Categories on Rent</h4>
            <h5 className="font-semibold text-slate-300 mb-1">Action Cameras on Rent</h5>
            <p>
              Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we&apos;ve got you covered.
            </p>

            {isSeoExpanded && (
              <div className="mt-3 space-y-3 animate-in fade-in duration-200">
                <h5 className="font-semibold text-slate-300">Gaming Consoles on Rent in Bangalore</h5>
                <p>
                  Experience next-gen gaming with PS5 Disc & Digital editions, Sony PlayStation VR2, Xbox Series S, and thrustmaster racing wheels with instant games library including FC25, FC26, FC27, Spider-Man Miles Morales, God of War Ragnarök, and Cricket 24 with free doorstep setup across Bangalore.
                </p>
              </div>
            )}

            <button
              onClick={() => setIsSeoExpanded(!isSeoExpanded)}
              className="mt-2 flex items-center gap-1 font-bold text-white hover:text-[#8ee600] transition"
            >
              <span>{isSeoExpanded ? "Read Less" : "Read More"}</span>
              {isSeoExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Company & Social Section */}
        <div className="py-12 border-b border-slate-800">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center">
              <span className="font-heading text-2xl font-black italic tracking-tight text-white">
                Share
              </span>
              <span className="ml-0.5 rounded-lg bg-[#2563eb] px-1.5 py-0.5 font-heading text-2xl font-black italic tracking-tight text-[#8ee600]">
                Pal
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-xs">
            {/* Column 1: Sharepal */}
            <div>
              <h4 className="font-bold text-white mb-3">Sharepal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Why SharePal</Link></li>
                <li><Link href="#" className="hover:text-white transition">Sitemap</Link></li>
                <li><Link href="#" className="hover:text-white transition">CarePal</Link></li>
              </ul>
            </div>

            {/* Column 2: Become a Pal */}
            <div>
              <h4 className="font-bold text-white mb-3">Become a Pal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Sharepal for Creators</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition">Sharepal for Brands</Link></li>
                <li className="flex items-center gap-1.5">
                  <Link href="#" className="hover:text-white transition">Asset Funding Program</Link>
                  <span className="rounded bg-[#8ee600] px-1 py-0.2 text-[9px] font-black text-slate-950">New</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Link href="#" className="hover:text-white transition">Rent Your Gear</Link>
                  <span className="rounded bg-[#8ee600] px-1 py-0.2 text-[9px] font-black text-slate-950">New</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Information */}
            <div>
              <h4 className="font-bold text-white mb-3">Information</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition underline">How it works?</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
                <li><Link href="#" className="hover:text-white transition">Verification</Link></li>
                <li><Link href="#" className="hover:text-white transition">Cancellation Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Life at Sharepal</Link></li>
              </ul>
            </div>

            {/* Column 4: Policies */}
            <div>
              <h4 className="font-bold text-white mb-3">Policies</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Terms & Condition</Link></li>
                <li><Link href="#" className="hover:text-white transition">Shipping policy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Damage Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms of Use</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 5: Need Help */}
            <div>
              <h4 className="font-bold text-white mb-3">Need Help</h4>
              <ul className="space-y-2.5 text-slate-400">
                <li className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-slate-400" />
                  <Link href="#" className="hover:text-white transition">Contact Support</Link>
                </li>
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <a href="mailto:care@sharepal.in" className="hover:text-white transition">care@sharepal.in</a>
                </li>
                <li className="flex items-center space-x-3 pt-2">
                  <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
                  <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                  <a href="#" className="text-slate-400 hover:text-white transition" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Go Up */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white transition"
          >
            <span>Go up</span>
            <ChevronUp className="h-4 w-4" />
          </button>

          <div>© 2026. SWNAC E-Kiraya Services Pvt Ltd</div>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-500 font-bold">♥</span>
            <span>for India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
