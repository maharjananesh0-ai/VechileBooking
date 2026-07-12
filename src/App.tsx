/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VehicleStats from './components/VehicleStats';
import BookingForm from './components/BookingForm';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Toggle theme class on body for styling continuity
  useEffect(() => {
    const savedTheme = localStorage.getItem('king_long_dark_mode');
    if (savedTheme === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('king_long_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSeatToggle = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'
    }`}>
      {/* Premium Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Core Container */}
      <main className="space-y-4">
        {/* Hero Area */}
        <Hero darkMode={darkMode} onBookNowClick={scrollToBooking} />

        {/* Vehicle Stats, Specs, and Seat Planner */}
        <VehicleStats
          darkMode={darkMode}
          selectedSeats={selectedSeats}
          onSeatToggle={handleSeatToggle}
        />

        {/* Validated Booking Form and Local History list */}
        <BookingForm
          darkMode={darkMode}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />

        {/* FAQ Accordions */}
        <FAQSection darkMode={darkMode} />
      </main>

      {/* Structured Footer with Location, Contacts & Dynamic QR */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

