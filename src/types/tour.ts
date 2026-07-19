export type Destination =
  | 'Kathmandu'
  | 'Pokhara'
  | 'Chitwan'
  | 'Everest Region'
  | 'Lumbini'
  | 'Nagarkot'
  | 'Bhaktapur/Patan'
  | 'Annapurna'
  | 'Mustang'
  | 'Bardia';

export type TourType =
  | 'Cultural & Heritage'
  | 'Adventure & Trekking'
  | 'Wildlife Safari'
  | 'Honeymoon'
  | 'Spiritual/Pilgrimage'
  | 'Family-Friendly'
  | 'Luxury';

export interface Tour {
  id: string;
  title: string;
  destinations: Destination[];
  types: TourType[];
  description: string;
  duration: string;
  image: string;
}
