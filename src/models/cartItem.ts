import { Product } from 'src/models/product';
export interface CartItem extends Product {
    quantity: number;
}