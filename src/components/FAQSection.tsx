import { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqItems: FAQItem[] = [
  {
    category: 'Bookings',
    question: 'Can I book for Manakamana trips?',
    answer: 'Yes, absolutely! The King Long is highly popular for trips to the sacred Manakamana Temple. We pick you up from your Kathmandu address and drive via the Prithvi Highway to Kurintar (the Cable Car station). The micro waits for you at Kurintar while you visit the temple and returns you safely back to Kathmandu. We can also do multi-day stops if needed.',
  },
  {
    category: 'Pricing',
    question: 'Can I negotiate the proposed budget?',
    answer: 'Yes! The "Your Budget" field on our booking form is your initial proposal. Since this is a personal vehicle, we do not have rigid corporate rates. We discuss your proposal transparently over WhatsApp to finalize a friendly, fair rate that covers fuel, driver allowance, and road taxes with zero hidden surprises.',
  },
  {
    category: 'Capacity',
    question: 'How many passengers are allowed on board?',
    answer: 'The maximum allowed capacity is strictly 13 passengers. This matches our luxury individual seating cabin structure, ensuring that every guest gets a comfortable reclining seat with their own dedicated AC vent and USB port. Over-passenger hauling is strictly prohibited for safety and comfort.',
  },
  {
    category: 'Cancellation',
    question: 'Is there a cancellation fee if my travel plans change?',
    answer: 'No, we do not charge any cancellation fees! Since there are no advanced payment processing gates on this page, you can cancel or postpone your trip free of charge. We kindly request that you inform us at least 24 hours in advance via WhatsApp so we can accommodate other eager travelers.',
  },
  {
    category: 'Expenses',
    question: 'Are fuel, highway toll permits, and driver allowance included?',
    answer: 'Yes. During our WhatsApp confirmation chat, we will finalize a fixed, all-inclusive fare. This means fuel, driver meals/allowance, and highway road tolls are bundled together so you do not have to worry about extra day-to-day out-of-pocket expenses.',
  },
];

interface FAQProps {
  darkMode: boolean;
}

export default function FAQSection({ darkMode }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // open first by default

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 border-t transition-colors duration-300 dark:border-zinc-800 border-zinc-100" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rhodo-500">
            Frequently Asked Questions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-display font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
            Answers to Your Travel Queries
          </h2>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Have questions about fuel, permits, or hilly road travel? Read our FAQ guidelines or ask us directly on WhatsApp!
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? darkMode
                      ? 'bg-zinc-900 border-zinc-800 shadow-lg'
                      : 'bg-zinc-50/80 border-zinc-300/80 shadow-md'
                    : darkMode
                      ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
                id={`faq_accordion_card_${idx}`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                  id={`faq_accordion_trigger_${idx}`}
                >
                  <div className="flex items-start space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-rhodo-500 shrink-0 mt-0.5" />
                    <span className={`text-sm sm:text-base font-semibold font-display ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                      {item.question}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-rhodo-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-80 opacity-100 border-t ' + (darkMode ? 'border-zinc-800' : 'border-zinc-200') : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`p-5 text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
