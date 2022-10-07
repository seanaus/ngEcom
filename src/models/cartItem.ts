import { Product } from 'src/models/product';
export interface CartItem extends Product {
    itemCost: number | 0
    quantity: number | 0;
}
