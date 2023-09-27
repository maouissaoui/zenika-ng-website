import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  basketSize$ = this.basketService.basketSize$

  constructor(private basketService: BasketService) {}
  
  
}





