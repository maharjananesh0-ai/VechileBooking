import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, HelpCircle, Send, CheckCircle, MessageSquare, History, Trash2, ArrowUpRight } from 'lucide-react';
import { BookingData } from '../types';

interface BookingFormProps {
  darkMode: boolean;
  selectedSeats: number[];
  setSelectedSeats: (seats: number[]) => void;
}

export default function BookingForm({ darkMode, selectedSeats, setSelectedSeats }: BookingFormProps) {
  // Main form state
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    pickupAddress: '',
    destination: '',
    date: '',
    time: '',
    numPassengers: 1,
    budget: '',
    specialRequests: '',
    selectedSeats: [],
  });

  // Validation errors state
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  
  // Local bookings history
  const [history, setHistory] = useState<BookingData[]>([]);
  
  // Success receipt modal state
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<BookingData | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('king_long_bookings');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync selectedSeats from parent to formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedSeats: selectedSeats,
      // Only set numPassengers to seat count if seats are actually selected
      numPassengers: selectedSeats.length > 0 ? selectedSeats.length : prev.numPassengers,
    }));
  }, [selectedSeats]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup Address is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.date) newErrors.date = 'Pickup Date is required';
    if (!formData.time) newErrors.time = 'Pickup Time is required';
    
    const passengers = Number(formData.numPassengers);
    if (!passengers || passengers < 1) {
      newErrors.numPassengers = 'Must be at least 1 passenger';
    } else if (passengers > 13) {
      newErrors.numPassengers = 'Maximum capacity is 13 passengers';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Please enter your proposed budget';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePassengerChange = (amount: number) => {
    const currentVal = Number(formData.numPassengers) || 1;
    const newVal = Math.max(1, Math.min(13, currentVal + amount));
    
    // If the user manually changes passenger amount, and they have selected seats, 
    // let's clear the seat selections to prevent mismatch unless it equals the seat count
    if (selectedSeats.length > 0 && selectedSeats.length !== newVal) {
      setSelectedSeats([]);
    }

    setFormData((prev) => ({ ...prev, numPassengers: newVal }));
    if (errors.numPassengers) {
      setErrors((prev) => ({ ...prev, numPassengers: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        document.getElementsByName(firstErrorKey)[0]?.focus();
      }
      return;
    }

    const submissionData = {
      ...formData,
      selectedSeats: [...selectedSeats],
    };

    // Save to local storage history
    const updatedHistory = [submissionData, ...history].slice(0, 5); // keep last 5
    localStorage.setItem('king_long_bookings', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    
    setLastSubmitted(submissionData);
    setShowReceipt(true);
  };

  const handleSendWhatsApp = () => {
    if (!lastSubmitted) return;

    const seatsStr = lastSubmitted.selectedSeats.length > 0
      ? `#${lastSubmitted.selectedSeats.sort((a,b)=>a-b).join(', #')}`
      : 'No specific seat pre-selected';

    const msg = `🚨 *NEW KING LONG BOOKING REQUEST* 🚨

🚐 *Vehicle:* King Long 14-Seater Micro
👤 *Customer Name:* ${lastSubmitted.fullName}
📞 *Phone:* ${lastSubmitted.phone}
📍 *Pickup:* ${lastSubmitted.pickupAddress}
🗺️ *Destination:* ${lastSubmitted.destination}
📅 *Date:* ${lastSubmitted.date}
🕒 *Time:* ${lastSubmitted.time}
👥 *Passengers:* ${lastSubmitted.numPassengers} traveler(s)
💺 *Selected Seats:* ${seatsStr}
💰 *Your Budget:* NPR ${Number(lastSubmitted.budget).toLocaleString('en-NP')}
📝 *Special Requests:* ${lastSubmitted.specialRequests.trim() || 'None'}

_Request sent via QR Booking Landing Page_`;

    const waUrl = `https://wa.me/9779851019058?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setShowReceipt(false);
    
    // Clear form
    setFormData({
      fullName: '',
      phone: '',
      pickupAddress: '',
      destination: '',
      date: '',
      time: '',
      numPassengers: 1,
      budget: '',
      specialRequests: '',
      selectedSeats: [],
    });
    setSelectedSeats([]);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local booking request history?')) {
      localStorage.removeItem('king_long_bookings');
      setHistory([]);
    }
  };

  // Get helpful dynamic budget indicators based on chosen destination
  const getBudgetHelper = () => {
    switch (formData.destination) {
      case 'Kathmandu Valley':
        return 'Standard Kathmandu local trips run around NPR 7,000 - 10,000 per day depending on itinerary.';
      case 'Manakamana':
        return 'Typical Kathmandu-Manakamana-Kathmandu round trips run around NPR 14,000 - 18,000 (includes fuel & driver toll).';
      default:
        return 'Propose an appropriate fare. Custom long highway routes are calculated based on mileage & mountain climbs.';
    }
  };

  return (
    <section className="py-16 md:py-24" id="booking-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rhodo-500">
            Booking Form
          </span>
          <h2 className={`text-3xl sm:text-4xl font-display font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
            Secure Your Ride Instantly
          </h2>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Fill out your details to propose your budget and details. When you click request, a prefilled WhatsApp message will open to finish negotiation directly with the owner.
          </p>
        </div>

        {/* Main Grid: Form Left, Instructions/History Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container (8 cols) */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className={`p-6 sm:p-8 rounded-3xl border text-left shadow-xl relative ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
              }`}
              id="king_long_booking_form"
            >
              <div className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="fullName" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Full Name <span className="text-rhodo-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="E.g., Anesh Maharjan"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : darkMode
                          ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Phone Number <span className="text-rhodo-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="E.g., 9851100000"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                      errors.phone
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : darkMode
                          ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>

                {/* From (Pickup Address) */}
                <div>
                  <label htmlFor="pickupAddress" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    From (Pickup Location) <span className="text-rhodo-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-400" />
                    <input
                      type="text"
                      id="pickupAddress"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      placeholder="E.g., Sohrakhutte, Kathmandu"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                        errors.pickupAddress
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : darkMode
                            ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                      }`}
                    />
                  </div>
                  {errors.pickupAddress && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pickupAddress}</p>}
                </div>

                {/* To (Destination) */}
                <div>
                  <label htmlFor="destination" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    To (Destination) <span className="text-rhodo-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-rhodo-500" />
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="E.g., Pokhara, Manakamana, Bhaktapur"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                        errors.destination
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : darkMode
                            ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                      }`}
                    />
                  </div>
                  {errors.destination && <p className="text-red-500 text-xs mt-1 font-medium">{errors.destination}</p>}
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Date <span className="text-rhodo-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                          errors.date
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : darkMode
                              ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                              : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                        }`}
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.date}</p>}
                  </div>

                  <div>
                    <label htmlFor="time" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Time <span className="text-rhodo-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                          errors.time
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : darkMode
                              ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                              : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                        }`}
                      />
                    </div>
                    {errors.time && <p className="text-red-500 text-xs mt-1 font-medium">{errors.time}</p>}
                  </div>
                </div>

                {/* Number of Passengers */}
                <div>
                  <label htmlFor="numPassengers" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Number of Passengers <span className="text-rhodo-500">*</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handlePassengerChange(-1)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg border transition-colors ${
                        darkMode
                          ? 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                      id="num_passengers_minus_btn"
                    >
                      -
                    </button>
                    
                    <div className={`w-16 text-center font-display font-bold text-base ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                      {formData.numPassengers}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePassengerChange(1)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg border transition-colors ${
                        darkMode
                          ? 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                      id="num_passengers_plus_btn"
                    >
                      +
                    </button>
                    
                    {selectedSeats.length > 0 && (
                      <span className="text-xs text-rhodo-500 font-mono font-medium animate-pulse ml-2">
                        (Synced with {selectedSeats.length} Selected Seats)
                      </span>
                    )}
                  </div>
                  {errors.numPassengers && <p className="text-red-500 text-xs mt-1 font-medium">{errors.numPassengers}</p>}
                </div>

                {/* Budget input with exact label requested: "Your Budget (NPR)" */}
                <div>
                  <label htmlFor="budget" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Your Budget (NPR) <span className="text-rhodo-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="E.g., 15000"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm ${
                      errors.budget
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : darkMode
                          ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                    }`}
                  />
                  {errors.budget ? (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.budget}</p>
                  ) : (
                    <p className={`text-[11px] mt-1.5 leading-relaxed flex items-start ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      <HelpCircle className="w-3.5 h-3.5 inline mr-1 text-gold-500 shrink-0 mt-0.5" />
                      <span>{getBudgetHelper()}</span>
                    </p>
                  )}
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="E.g., Need 2 child seats, extra roof luggage carriers, wheelchair assistance, or multiple pick-ups..."
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm resize-none ${
                      darkMode
                        ? 'border-zinc-800 bg-zinc-950 text-white focus:border-rhodo-500'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-950 focus:border-rhodo-500'
                    }`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-white font-display font-bold bg-rhodo-500 hover:bg-rhodo-600 shadow-lg shadow-rhodo-500/20 hover:shadow-rhodo-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
                  id="request_booking_submit_btn"
                >
                  <Send className="w-4.5 h-4.5 mr-2" />
                  Request Booking
                </button>

              </div>
            </form>
          </div>

          {/* Guidelines & Booking History (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Guidelines Card */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? 'bg-zinc-900/50 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
            }`}>
              <h3 className="text-base font-display font-bold flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                Booking Guidelines
              </h3>
              <ul className={`text-xs space-y-3 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-rhodo-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                  <span><strong>No Payment Required:</strong> Booking is 100% free to request. Payment and final pricing are agreed on WhatsApp.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-rhodo-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                  <span><strong>WhatsApp Required:</strong> Pressing submit prepares a receipt and triggers WhatsApp. Make sure WhatsApp is active!</span>
                </li>
              </ul>
            </div>

            {/* Local History Section */}
            {history.length > 0 && (
              <div className={`p-6 rounded-3xl border ${
                darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-display font-bold flex items-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <History className="w-4.5 h-4.5 text-gold-500 mr-2" />
                    My Bookings
                  </h3>
                  <button
                    onClick={clearHistory}
                    className={`p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors`}
                    title="Clear History"
                    id="clear_history_btn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {history.map((booking, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-600'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`font-bold font-display ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                          {booking.destination}
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">
                          NPR {Number(booking.budget).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>Date: {booking.date}</span>
                        <span>{booking.numPassengers} Pax</span>
                      </div>
                      {booking.selectedSeats.length > 0 && (
                        <div className="text-[9px] text-rhodo-500 font-mono">
                          Seats: #{booking.selectedSeats.sort((a,b)=>a-b).join(', #')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* SUCCESS RECEIPT MODAL */}
      {showReceipt && lastSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl text-left transform scale-100 transition-all ${
            darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-950'
          }`}>
            
            {/* Header */}
            <div className="text-center mb-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-black tracking-tight">
                Booking Proposal Ready!
              </h3>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Your details are validated. Click below to initiate WhatsApp chat.
              </p>
            </div>

            {/* Receipt details */}
            <div className={`p-4 rounded-2xl border space-y-2.5 text-xs font-mono mb-6 ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-150 text-zinc-600'
            }`}>
              <div className="flex justify-between border-b border-dashed border-zinc-700/20 pb-2">
                <span className="font-bold">VEHICLE:</span>
                <span className="text-rhodo-500">King Long 14-Seater</span>
              </div>
              <div className="flex justify-between">
                <span>CLIENT NAME:</span>
                <span className="font-semibold text-zinc-900 dark:text-white truncate max-w-[180px]">{lastSubmitted.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>PHONE:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{lastSubmitted.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>PICKUP:</span>
                <span className="font-semibold text-zinc-900 dark:text-white truncate max-w-[180px]">{lastSubmitted.pickupAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>DESTINATION:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{lastSubmitted.destination}</span>
              </div>
              <div className="flex justify-between">
                <span>DATE / TIME:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{lastSubmitted.date} @ {lastSubmitted.time}</span>
              </div>
              <div className="flex justify-between">
                <span>PASSENGERS:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{lastSubmitted.numPassengers} Pax</span>
              </div>
              {lastSubmitted.selectedSeats.length > 0 && (
                <div className="flex justify-between">
                  <span>SEATS CHOSEN:</span>
                  <span className="font-semibold text-rhodo-500">#{lastSubmitted.selectedSeats.sort((a,b)=>a-b).join(', #')}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-dashed border-zinc-700/20 pt-2 font-bold text-sm">
                <span className="text-zinc-900 dark:text-white">PROPOSED BUDGET:</span>
                <span className="text-emerald-500">NPR {Number(lastSubmitted.budget).toLocaleString('en-NP')}</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-display font-bold bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
                id="modal_whatsapp_send_btn"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Request via WhatsApp
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
              
              <button
                onClick={() => setShowReceipt(false)}
                className={`w-full py-2.5 rounded-xl font-display font-semibold text-xs border transition-all cursor-pointer ${
                  darkMode
                    ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
                id="modal_cancel_btn"
              >
                Go Back / Edit Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
