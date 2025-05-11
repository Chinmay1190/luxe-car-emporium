
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    power: string;
    topSpeed: string;
    acceleration: string;
    transmission: string;
    drive: string;
    fuelType: string;
    seats: number;
  };
  images: string[];
  colors: string[];
}

export type Category = 'Sports' | 'Luxury' | 'SUV' | 'Sedan' | 'Convertible' | 'Electric' | 'All';
