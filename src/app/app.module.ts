import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DEFAULT_CURRENCY_CODE, InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { SortProductsPipe } from './sort-products/sort-products.pipe';
import { SelectProductKeyComponent } from './select-product-key/select-product-key/select-product-key.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './catalog/catalog.component';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

export  const APP_TITLE = new InjectionToken<string>('APP_TITLE');

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ProductComponent,
    SortProductsPipe,
    SelectProductKeyComponent,
    CatalogComponent,
    BasketComponent,
    ProductDetailsComponent,
    CheckoutFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: APP_TITLE, useValue: 'Bienvenue sur Zenika Ecommerce' },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
