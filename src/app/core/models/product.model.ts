import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  specs: string | null;
  price: number;
  stockQty: number;
  inStock: boolean;
  imageUrl: string | null;
  featured: boolean;
  category: Category;
}