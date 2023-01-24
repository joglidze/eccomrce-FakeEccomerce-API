import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  filterCategories: string | undefined;
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;
  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription?.unsubscribe();
    }
  }
  getProducts(): void {
    this.productSubscription = this.storeService
      .getProducts(this.count, this.sort,this.filterCategories)
      .subscribe((_product) => {
        this.products = _product;
        console.log(_product);
      });
  }
  onColumnNumber(colsNum: any) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onChangeCategory(event: string) {
    this.filterCategories = event;
    this.getProducts();
    console.log(this.filterCategories);
  }

  onAddTocart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  itemCount(newCount: number) {
    this.count=newCount.toString()
    this.getProducts()
  }

  onChangeSort(newSort: any): void {
      this.sort=newSort;
      this.getProducts()
  }
}
