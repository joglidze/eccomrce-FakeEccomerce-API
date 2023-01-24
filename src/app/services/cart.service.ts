import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  [x: string]: any;
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => {
      return _item.id === item.id;
    });
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'ok', { duration: 3000 });
    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is clear', 'OK', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuanity(item: CartItem): void {
    let itemRemoval: CartItem | undefined;
    let filteredItems: any = this.cart.value.items.map((_item) => {
      if (_item.id == item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemRemoval = _item;
        }
      }
      return _item;
    });

    if (itemRemoval) {
      filteredItems = this.removeFromCart(itemRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed', ' ok', { duration: 3000 });
  }
}
