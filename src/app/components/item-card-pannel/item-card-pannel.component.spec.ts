import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardPannelComponent } from './item-card-pannel.component';

describe('ItemCardPannelComponent', () => {
  let component: ItemCardPannelComponent;
  let fixture: ComponentFixture<ItemCardPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCardPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
