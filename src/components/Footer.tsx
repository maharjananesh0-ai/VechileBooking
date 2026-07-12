import { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, ExternalLink, Calendar, Copy, Check } from 'lucide-react';
import { getBaseUrl } from '../utils/url';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [currentUrl, setCurrentUrl] = useState(() => getBaseUrl());
  const [copied, setCopied] = useState(false);

  // Safely extract window.location on browser mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = getBaseUrl();
      const bookingPath = window.location.pathname;
      const query = window.location.search;
      setCurrentUrl(`${baseUrl}${bookingPath}${query}`);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  // Dynamic QR Code generation URL using qrserver
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`;

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        darkMode ? 'bg-zinc-950 border-zinc-900 text-zinc-400' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: About single vehicle (4 cols) */}
          <div className="md:col-span-5 text-left space-y-4">
            <h3 className="text-white text-lg font-display font-bold">
              King Long <span className="text-rhodo-500">14-Seater</span>
            </h3>
            <p className="text-xs leading-relaxed max-w-sm">
              We operate a single, highly maintained private 14-seater microbus starting from Kathmandu Valley. Perfect for family pilgrimages to Manakamana, corporate events, wedding groups, and luxury tours across Nepal.
            </p>
            
            {/* Quick stats list */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-rhodo-500 shrink-0" />
                <span>Base Location: Sohrakhutte, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Calendar className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Operating Hours: 24/7</span>
              </div>
            </div>
          </div>

          {/* Col 2: Direct Contact Points (3 cols) */}
          <div className="md:col-span-3 text-left space-y-4">
            <h3 className="text-white text-xs font-mono font-bold uppercase tracking-widest border-l-2 border-rhodo-500 pl-2">
              Contact Details
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="tel:+9779851019058"
                  className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors"
                  id="footer_tel_link"
                >
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Call Owner: +977 9851019058</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9779851019058?text=Hi!%20I'm%20interested%20in%20booking%20your%20King%20Long%2014-Seater%20micro."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors"
                  id="footer_wa_link"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Sohrakhutte,Kathmandu,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors"
                  id="footer_maps_link"
                >
                  <MapPin className="w-4 h-4 text-rhodo-500 shrink-0" />
                  <span>Google Maps Location <ExternalLink className="w-3 h-3 ml-1 inline opacity-60" /></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Beautiful dynamic QR scan box (4 cols) */}
          <div className="md:col-span-4 text-left">
            <div className="p-4 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 flex flex-col sm:flex-row items-center gap-4">
              {/* QR Image */}
              <div className="bg-white p-2 rounded-xl shrink-0 shadow-lg relative group">
                <img
                  src={qrCodeUrl}
                  alt="Booking Page QR Code"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                  id="footer_qr_img"
                />
              </div>

              {/* QR Description */}
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  Scan to Share & Book
                </h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Stick this QR inside the vehicle or share it. Scanning opens this precise booking web applet on any mobile device.
                </p>
                
                {/* Copy link button */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center sm:justify-start px-2.5 py-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 text-[10px] font-medium transition-all w-full cursor-pointer"
                  id="footer_copy_url_btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400 mr-1 shrink-0" />
                      <span>Copy Booking Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Separator */}
        <hr className="my-8 border-zinc-800" />

        {/* Bottom copyright & legal actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {currentYear} King Long 14-Seater. Dedicated Booking Portal. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="#booking-section"
              onClick={(e) => {
                e.preventDefault();
                alert("Privacy Policy: We operate offline. The details you submit in this form are not sold, transmitted, or saved in any cloud server. They are stored locally on your device for history recall, and passed directly to your personal WhatsApp app upon submission.");
              }}
              className="hover:text-white transition-colors"
              id="privacy_policy_link"
            >
              Privacy Policy
            </a>
            <a
              href="#booking-section"
              onClick={(e) => {
                e.preventDefault();
                alert("Terms & Conditions: Booking requests are proposals. Submitting a request does not constitute a guaranteed reservation until final terms, vehicle availability, and pricing have been negotiated and agreed upon via WhatsApp.");
              }}
              className="hover:text-white transition-colors"
              id="terms_and_conditions_link"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
