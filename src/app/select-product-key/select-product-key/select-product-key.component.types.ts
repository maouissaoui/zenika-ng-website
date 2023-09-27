import { Product } from "src/app/product/product.types";

export type SelectProductKey = keyof Pick<Product, 'price' | 'stock'>;