import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent<T> {
  @Input() items: T[] = [];
  @Input() itemKey?: keyof T; // Make itemKey optional and remove default assignment
  @Output() selected = new EventEmitter<T>();

  onSelect(item: T): void {
    this.selected.emit(item);
  }

  // Utility function to safely access the item key
  getItemKeyValue(item: T): any {
    // If itemKey is provided, return the value, else return a placeholder or undefined
    return this.itemKey && item[this.itemKey];
  }
}