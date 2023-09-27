import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../app/catalog/catalog.component'
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'basket',
        component: BasketComponent,
      },
      {
        path: `product/:id`,
        component: ProductDetailsComponent,
      },

      {
        path: '**',
        redirectTo: 'catalog',
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}