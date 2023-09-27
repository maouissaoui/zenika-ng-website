import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
   items$ = this.basketService.items$;

   total$ = this.basketService.total$;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.dispatchItems().subscribe();
  }  
}
