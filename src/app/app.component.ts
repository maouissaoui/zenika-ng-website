import { Component, Inject } from '@angular/core';
import { Product } from './product/product.types';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.module';
import { SelectProductKey } from './select-product-key/select-product-key/select-product-key.component.types';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}

