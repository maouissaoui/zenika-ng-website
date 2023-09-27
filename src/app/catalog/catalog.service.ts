import { Injectable } from '@angular/core';
import { Product } from '../product/product.types';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
 // Store the products in a BehaviorSubject
 private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

 // Expose the products as observable
 products$ = this._products$.asObservable();

 hasProductsInStock$ = this._products$.pipe(map((products) => products?.some(product => product.stock > 0)))

 // It's a good practice to make available the products as instant value 
 // (but use it carefullafter it's not a reactive value)
 get productsSnapshot() {
   return this._products$.value;
 }

 constructor(private apiService: ApiService) {}

 dispatchProducts(): Observable<void> {
   // Fetch the products from the API
   return this.apiService.fetchProducts().pipe(
     // Use a "side-effect" to store the server response in the service
     tap((products) => this._products$.next(products)),
     // Be sure the consumer of the service gets the
     // products only from the `products$` observable
     map(() => undefined),
   );


 // // A decreaseStock(productId: string): boolean method to decrease the corresponding product stock if it is greater than 0
 // decreaseStock(productId: string): boolean {
 //   const product = this._products.find(product => product.id == productId)

 //   if(product && product.stock > 0) {
 //     product.stock--;
 //     return true;
 //   } else {
 //     return false;
 //   }
 // }
}
}
 

/*
  private _products: Product[]= [
    {
      "id": "welsch",
      "title": "Coding the welsch",
      "description": "Tee-shirt col rond - Homme",
      "photo": "/assets/coding-the-welsch.jpg",
      "price": 20,
      "stock": 2
    },
    {
      "id": "world",
      "title": "Coding the world",
      "description": "Tee-shirt col rond - Homme",
      "photo": "/assets/coding-th-world.jpg",
      "price": 18,
      "stock": 2
    },
    {
      "id": "vador",
      "title": "Duck Vador",
      "description": "Tee-shirt col rond - Femme",
      "photo": "/assets/coding-the-stars.jpg",
      "price": 21,
      "stock": 2
    },
    {
      "id": "snow",
      "title": "Coding the snow",
      "description": "Tee-shirt col rond - Femme",
      "photo": "/assets/coding-the-snow.jpg",
      "price": 19,
      "stock": 2
    }
  ]


  total: number = 0;


  get products(): Product[] {
   return this._products;
  }

  get hasProductsInStock():boolean{
    return this._products.some( product => product.stock > 0);
   }

   decreaseStock(productId: string): boolean{
    const product = this._products.find(product => product.id = productId)
    if (product && product.stock > 0)
    {
      product.stock--;
      return true;
     }else {  return false;}
   

  }*/
