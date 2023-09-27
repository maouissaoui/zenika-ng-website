import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { ProductComponent } from '../product/product.component';

describe('CatalogComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MenuComponent, ProductComponent]
    })

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display the products', () => {
    fixture.detectChanges()
    const productComponents = fixture.debugElement.queryAll(By.css('app-product'))
    productComponents.forEach((debugElement, index) => {
      expect(debugElement.componentInstance.product).toEqual(component.products[index])
    })

    expect(productComponents.length).toEqual(4)
  })

  it('should update the total when a product emits the "addToBasket" event (DOM testing)', () => {
    fixture.detectChanges()
    const debugElement = fixture.debugElement.query(By.css('app-product'))
    const productComponent: ProductComponent = debugElement.componentInstance

    productComponent.addToBasket.emit(productComponent.product)

    fixture.detectChanges()

    const p = (fixture.nativeElement as HTMLElement).querySelector('[test-total]')

    expect(p?.textContent).toContain('20 €')
  })

  it('should update the total when "addToBasket" class method is called (Class testing)', () => {
    component.total = 0

    component.increaseTotal(component.products[0])

    expect(component.total).toEqual(20)
  })

  it('should decrease the stock of the product added to the basket', () => {
    // Given
    expect(component.products[0].stock).toBe(2);

    // When
    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', component.products[0]);

    // Then
    expect(component.products[0].stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    // Given
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(4);

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2);
    expect(productDebugElements[0].properties['product']).toBe(component.products[2]);
    expect(productDebugElements[1].properties['product']).toBe(component.products[3]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    component.products[2].stock = 0;
    component.products[3].stock = 0;
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});

