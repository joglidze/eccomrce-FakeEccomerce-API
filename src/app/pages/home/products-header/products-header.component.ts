import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() colsNumber = new EventEmitter<number>();
  @Output() itemsCount = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<number>();

  sort = 'desc';
  itemsShowCount = 12;
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: any): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    
    this.itemsCount.emit(count);
  }

  onColumnUpdated(colsNum: number): void {
    this.colsNumber.emit(colsNum);
  }
}
