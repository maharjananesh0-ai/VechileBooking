export interface BookingData {
  fullName: string;
  phone: string;
  pickupAddress: string;
  destination: string; // 'Kathmandu Valley' | 'Manakamana' | 'Other'
  date: string;
  time: string;
  numPassengers: number;
  budget: string;
  specialRequests: string;
  selectedSeats: number[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'interior' | 'exterior' | 'scenic';
}

export interface Seat {
  id: number;
  label: string;
  row: number;
  type: 'passenger' | 'driver';
  isWindow: boolean;
}
