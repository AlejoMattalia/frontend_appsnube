import { Brand } from "./brands";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: string;
    image_url: string;
    brand_id: number;
    brand: Brand
}