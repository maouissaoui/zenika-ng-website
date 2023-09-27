import { Component, Inject } from '@angular/core';
import { Product } from '../product/product.types';
import { Observable } from 'rxjs';
import { APP_TITLE } from '../app.module';
import { BasketService } from '../basket/basket.service';
import { SelectProductKey } from '../select-product-key/select-product-key/select-product-key.component.types';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  productKey: SelectProductKey = 'price';

  products$: Observable<Product[] | undefined> = this.catalogService.products$

  total: number = 0

  hasProductsInStock$ = this.catalogService.hasProductsInStock$

  constructor(private catalogService: CatalogService, private basketService: BasketService, @Inject(APP_TITLE) public myAppName: string) {
  }


  ngOnInit(): void {
    this.basketService.dispatchItems().subscribe();
    this.catalogService.dispatchProducts().subscribe();
    this.basketService.total$.subscribe(
      (total) => this.total = total
    )
  }

  increaseTotal(product: Product) {
    this.basketService.addItem(product.id).subscribe(
      () => this.catalogService.dispatchProducts().subscribe()
    )
    // this.basketService.addItem(product);
    // this.catalogService.decreaseStock(product.id);
  }
}
