import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-item-card-pannel',
  templateUrl: './item-card-pannel.component.html',
  styleUrls: ['./item-card-pannel.component.scss']
})
export class ItemCardPannelComponent implements OnInit {
  @Input() idx: any;
  // @Input() value: any;
  @Input() item: any;
  @Input() itemType: string = "product";
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  async editQuantity(option: string) {
    // const refresh = (this.value > 1) ? true : false;
    await this.cartService.editQuantity(option, this.idx);
    // if(refresh)
    //   this.value = this.cartService.cart.items[this.idx].quantity;
  }
  async removeItem(index:number) {
    await this.cartService.delete(index);
  }

}


