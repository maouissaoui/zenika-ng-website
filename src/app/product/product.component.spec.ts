import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from './product.types';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    let product: Product;
    TestBed.configureTestingModule({
      declarations: [ProductComponent]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = { id: '20', title: 'TITLE', description: 'DESC', photo: 'photo', price: 10, stock: 4 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the product description', () => {
    const small = (fixture.nativeElement as HTMLElement).querySelector('[test-desc]')

    expect(small?.textContent).toEqual('DESC');
  });

  it('should display the product  photo as image url', () => {
    const img = (fixture.nativeElement as HTMLElement).querySelector('[test-image]')

    expect(img?.getAttribute('src')).toEqual('photo');
  });


  it('It should display the product title', () => {
    const a = (fixture.nativeElement as HTMLElement).querySelector('[test-title]')

    expect(a?.textContent).toEqual('TITLE'); 
  });


  it('It should display the product price', () => {
    const p = (fixture.nativeElement as HTMLElement).querySelector('[test-price]')

    expect(p?.textContent).toEqual('€10.00');
  });
  it('It should emit addToBasket event with the given product when the button is clicked', () => {
    const evmittSpy = spyOn(fixture.componentInstance.addToBasket, 'emit')
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')

    button?.click()
    expect(evmittSpy).toHaveBeenCalledWith(component.product);
  });

});
