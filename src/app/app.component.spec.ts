import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';

import
fdescribeimport { By } from '@angular/platform-browser';
('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, MenuComponent, ProductComponent]
  })
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`It shoud display the products`, () => {
    const productComponent= fixture.debugElement.queryAll(By.directive(ProductComponent))
productComponent.array.forEach((debugElement, index) => {
  console.log(debugElement.componentInstance)
  expect(debugElement.componentInstance.product).toEqual(component.products[index])
});
expect(productComponent.length).toEqual(4)
  });

  it('should update the total when a product emits the "addToBasket" event (DOM testing)', () => {
    const debugElement = fixture.debugElement.queryAll(By.directive(ProductComponent))
    const productComponent: ProductComponent = debugElement.componentInstance
    fixture.detectChanges()

    const p = (fixture.nativeElement as HTMLElement).querySelector('[test-total]')

expect(p?.textContent).toContain('20')
  });

  it('should update the total when "addToBasket" class method is called (Class testing)', () => {
    component.total= 0
    component.increaseTotal( component.products[0])
    expect(component.total).toEqual(20)
  });
});
