export interface ProductDto {
  name: string;
  description: string;
  price: number;
  discount?: number;
  brand?: string;
  category?: string;
  images?: string[];
  inStock?: boolean;
  stock?: number;
  sold?: number;
  isFeatured?: boolean;
}
