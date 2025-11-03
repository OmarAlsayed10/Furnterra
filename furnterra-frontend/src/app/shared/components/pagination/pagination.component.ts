import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() currentPage: number = 1
  @Input() totalPages: number = 1
  @Input() maxVisible: number = 5

  @Output() pageChange = new EventEmitter<number>()

  get pages(): number[] {
    const pages: number[] = []

    let start = Math.max(1, this.currentPage - Math.floor(this.maxVisible / 2))
    let end = Math.min(this.totalPages, start + this.maxVisible - 1)
    start = Math.max(1, end - this.maxVisible + 1)

    for (let i = start; i <= end; i++)pages.push(i)
    return pages;
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page <= this.totalPages && page >= 1) {
      this.pageChange.emit(page)
    }
  }

  next() {
    if (this.currentPage < this.totalPages) this.pageChange.emit(this.currentPage + 1)
  }

  prev() {
    if (this.currentPage > 1) this.pageChange.emit(this.currentPage - 1)
  }
}
