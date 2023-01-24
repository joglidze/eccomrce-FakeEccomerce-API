import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 1,
        quantity: 2,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 100,
        quantity: 3,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}
  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQauntity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQauntity(item: CartItem): void {
    this.cartService.removeQuanity(item);
  }

  onCheckUp(): void {
    this.http
      .post('http://localhost:4242', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51MTOopGfVuZUDeDHrDLrcc8JemnDxVIH9mdGTS5Ew9d075eEnoNvjsXmITrAn3jmvzclJSeCKRT3o5QU09aH30vy00RZkowrZ4'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
      
  }
}
