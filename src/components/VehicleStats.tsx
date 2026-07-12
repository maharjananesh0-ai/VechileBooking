import { Users, ShieldCheck, Heart, Wind, BatteryCharging, Zap, MapPin } from 'lucide-react';

interface VehicleStatsProps {
  darkMode: boolean;
  selectedSeats: number[];
  onSeatToggle: (seatId: number) => void;
}

export default function VehicleStats({ darkMode, selectedSeats, onSeatToggle }: VehicleStatsProps) {
  
  // Custom specifications list
  const specs = [
    { icon: <Wind className="w-5 h-5" />, title: 'Dual Air Conditioning', value: 'Individual ceiling vents for all passengers' },
    { icon: <BatteryCharging className="w-5 h-5" />, title: 'USB Device Charging', value: 'Ports available in every row' },
    { icon: <Zap className="w-5 h-5" />, title: 'High Roof / Airy Interior', value: 'Comfortable standing height and wide aisles' },
    { icon: <Users className="w-5 h-5" />, title: 'Optimal 14-Seater', value: 'Spacious legroom with individual headrests' },
  ];

  // Nepal destinations cards
  const destinations = [
    {
      name: 'Kathmandu Valley',
      badge: 'Local Travels',
      desc: 'Ideal for wedding groups, family gatherings, corporate team outings, airport transfers, and local heritage sightseeing trips around Kathmandu, Lalitpur, and Bhaktapur.',
      distance: 'Within Valley',
      accent: 'border-rhodo-500/20 bg-rhodo-500/5',
    },
    {
      name: 'Manakamana Temple',
      badge: 'Pilgrimage Specials',
      desc: 'Dedicated round trips to the sacred Manakamana temple, including smooth highway driving on the Prithvi Highway with high-torque comfort to handle steep hilly terrains.',
      distance: '105 km from KTM',
      accent: 'border-gold-500/20 bg-gold-500/5',
    },
    {
      name: 'Other Locations',
      badge: 'On Request',
      desc: 'Custom tours, highway travels, or specific pick-up locations in nearby districts. We provide tailored pricing based on road conditions and fuel requirements.',
      distance: 'Tailored Route',
      accent: 'border-zinc-500/20 bg-zinc-500/5',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-b transition-colors duration-300 dark:border-zinc-800 border-zinc-100" id="vehicle-info">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rhodo-500">
            Premium Transport Features
          </span>
          <h2 className={`text-3xl sm:text-4xl font-display font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
            Explore the King Long Micro Experience
          </h2>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            This isn&apos;t just a vehicle—it&apos;s a well-maintained personal travel space. Designed specifically for group comfort with plenty of legroom, luggage space, and reliable performance on Nepal&apos;s diverse highways.
          </p>
        </div>

        {/* Outer Flex Container for Layout Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Specs & Description */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <h3 className={`text-xl sm:text-2xl font-display font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Premium Vehicle Specifications
              </h3>
              <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Our King Long 14-Seater is meticulously maintained, ensuring maximum reliability and hygiene for family outings, corporate runs, and pilgrimage adventures.
              </p>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${
                    darkMode
                      ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-rhodo-500/10 flex items-center justify-center text-rhodo-500 mb-4">
                    {spec.icon}
                  </div>
                  <h4 className={`text-sm font-semibold font-display ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                    {spec.title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Areas Section */}
            <div className="space-y-4 pt-4">
              <div>
                <h3 className={`text-xl sm:text-2xl font-display font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Primary Service Areas
                </h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Convenient direct booking starting from Kathmandu Valley to beautiful destinations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {destinations.map((dest, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all hover:scale-[1.01] ${dest.accent} ${
                      darkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-500/10 text-zinc-500">
                          {dest.badge}
                        </span>
                        <span className="text-[10px] font-mono font-medium text-rhodo-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-0.5" /> {dest.distance}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-display mt-3">
                        {dest.name}
                      </h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity Interactive Seat Map */}
          <div className="lg:col-span-5 relative">
            <div
              className={`p-6 sm:p-8 rounded-3xl border text-center relative ${
                darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}
              id="interactive_seat_planner_container"
            >
              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase">
                Interactive
              </div>
              
              <h3 className={`text-lg sm:text-xl font-display font-bold text-left mb-2 ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                Interactive Cabin Layout
              </h3>
              <p className={`text-xs text-left mb-6 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Select your preferred seats. They will automatically sync with your reservation booking form details.
              </p>

              {/* Seat Map Area Wrapper (styled like a vehicle layout) */}
              <div className={`max-w-[260px] mx-auto p-6 rounded-4xl border relative shadow-inner ${
                darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                {/* Windshield & Dash area representing micro front */}
                <div className="w-full h-8 bg-zinc-700/20 rounded-t-2xl border-b border-dashed border-zinc-700/30 flex items-center justify-center mb-6 text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  ◀ FRONT OF VEHICLE
                </div>

                {/* Driver Seat & Front Row Row 1 */}
                <div className="grid grid-cols-3 gap-3 mb-6 items-center">
                  {/* Seat 1 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(1)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(1)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_1"
                    >
                      1
                    </button>
                    <span className={`text-[9px] font-mono font-medium mt-1 ${selectedSeats.includes(1) ? 'text-rhodo-500' : 'text-zinc-500'}`}>Pass.</span>
                  </div>
                  {/* Empty Middle Space / Aisle */}
                  <div className="w-10 h-10"></div>
                  {/* Driver (Unavailable) at Right */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-zinc-700 text-zinc-300 flex items-center justify-center font-mono text-xs font-bold border border-zinc-600 opacity-60 relative cursor-not-allowed cursor-help" title="Driver Seat">
                      D
                    </div>
                    <span className="text-[9px] font-mono font-medium text-zinc-500 mt-1">Driver</span>
                  </div>
                </div>

                {/* Row 2: Seats 2, 3 (2 seats) */}
                <div className="grid grid-cols-3 gap-3 mb-4 items-center">
                  {/* Empty aisle for passenger entry */}
                  <div className="w-10 h-10"></div>
                  {/* Seat 2 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(2)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(2)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_2"
                    >
                      2
                    </button>
                  </div>
                  {/* Seat 3 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(3)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(3)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_3"
                    >
                      3
                    </button>
                  </div>
                </div>

                {/* Row 3: Seats 4, 5, 6 (3 seats) */}
                <div className="grid grid-cols-3 gap-3 mb-4 items-center">
                  {/* Seat 4 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(4)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(4)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_4"
                    >
                      4
                    </button>
                  </div>
                  {/* Seat 5 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(5)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(5)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_5"
                    >
                      5
                    </button>
                  </div>
                  {/* Seat 6 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(6)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(6)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_6"
                    >
                      6
                    </button>
                  </div>
                </div>

                {/* Row 4: Seats 7, 8, 9 (3 seats) */}
                <div className="grid grid-cols-3 gap-3 mb-4 items-center">
                  {/* Seat 7 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(7)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(7)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_7"
                    >
                      7
                    </button>
                  </div>
                  {/* Seat 8 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(8)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(8)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_8"
                    >
                      8
                    </button>
                  </div>
                  {/* Seat 9 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(9)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(9)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_9"
                    >
                      9
                    </button>
                  </div>
                </div>

                {/* Row 5: Seats 10, 11, 12, 13 (Last Row: 4 seats) */}
                <div className="grid grid-cols-4 gap-2 items-center mt-6 pt-4 border-t border-dashed border-zinc-700/30">
                  {/* Seat 10 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(10)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(10)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_10"
                    >
                      10
                    </button>
                  </div>
                  {/* Seat 11 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(11)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(11)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_11"
                    >
                      11
                    </button>
                  </div>
                  {/* Seat 12 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(12)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(12)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_12"
                    >
                      12
                    </button>
                  </div>
                  {/* Seat 13 */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => onSeatToggle(13)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        selectedSeats.includes(13)
                          ? 'bg-rhodo-500 border-rhodo-600 text-white scale-105 shadow-md shadow-rhodo-500/20'
                          : darkMode
                            ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                      id="seat_btn_13"
                    >
                      13
                    </button>
                  </div>
                </div>

                {/* Rear of vehicle badge */}
                <div className="w-full text-center mt-4 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  ▲ REAR BACKROW
                </div>
              </div>

              {/* Map Legend */}
              <div className="flex justify-center items-center gap-4 mt-6 text-xs flex-wrap">
                <div className="flex items-center">
                  <div className={`w-3.5 h-3.5 rounded bg-zinc-700 opacity-60 mr-1.5`}></div>
                  <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>Unavailable</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3.5 h-3.5 rounded border border-zinc-300 ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100'} mr-1.5`}></div>
                  <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3.5 h-3.5 rounded bg-rhodo-500 mr-1.5"></div>
                  <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>Selected</span>
                </div>
              </div>

              {/* Selected stats details box */}
              <div className={`mt-6 p-4 rounded-xl text-left border ${
                darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Active Selection
                  </span>
                  <span className="text-xs bg-rhodo-500/10 text-rhodo-500 px-2 py-0.5 rounded-full font-bold">
                    {selectedSeats.length} / 13 Seats Selected
                  </span>
                </div>
                <div className={`text-sm mt-2 font-display font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {selectedSeats.length > 0 ? (
                    <span>Chosen Seat Numbers: <span className="text-rhodo-500">#{selectedSeats.sort((a,b)=>a-b).join(', #')}</span></span>
                  ) : (
                    <span className={`italic font-normal text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>No seats chosen. Click seats on the layout above!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
