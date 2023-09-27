
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { BasketItem } from './basket.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  itemsSnapshot: BasketItem[] | undefined = undefined;

  private _items$ = new ReplaySubject<BasketItem[]>(1);

  items$ = this._items$.asObservable();

  total$ = this.items$.pipe(map((basket) =>  basket.reduce((acc, item) => acc + item.price, 0)))

  basketSize$ = this.items$.pipe(map((basket) =>  basket.length))

  constructor(private apiService: ApiService) { }

  dispatchItems(): Observable<void> {
    return this.apiService.fetchBasket().pipe(
      // Use a "side-effect" to store the server response in the service
      tap((basket) => { this.itemsSnapshot = basket; this._items$.next(basket) }),
      // Be sure the consumer of the service gets the
      // products only from the `products$` observable
      map(() => undefined),
    );
  }

  addItem(productId: string): Observable<void> {
    return this.apiService.addToBasket(productId).pipe(
      tap((basketItem) => {
        this.itemsSnapshot ??= [];
        this.itemsSnapshot.push(basketItem); 
        this._items$.next(this.itemsSnapshot)}),
      map(() => undefined)
    )
  }
}

