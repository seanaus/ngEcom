import { Product } from 'src/models/product';
export interface CartItem extends Product {
    cost: number
    quantity: number;
}
