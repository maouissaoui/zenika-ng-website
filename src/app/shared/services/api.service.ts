import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from 'src/app/basket/basket.types';
import { Product } from 'src/app/product/product.types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8081/api/products')
  }

  fetchProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`http://localhost:8081/api/products/${productId}`)
  }

  fetchBasket(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`http://localhost:8081/api/basket`)
  }

  addToBasket(productId: string): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(`http://localhost:8081/api/basket`, { productId })
  }
}
