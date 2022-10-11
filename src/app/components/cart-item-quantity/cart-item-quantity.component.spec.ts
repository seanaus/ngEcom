import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemQuantityComponent } from './cart-item-quantity.component';

describe('CartItemQuantityComponent', () => {
  let component: CartItemQuantityComponent;
  let fixture: ComponentFixture<CartItemQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
