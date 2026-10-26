import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-shop',
  imports: [FormsModule, ProductCard],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  protected readonly categories = signal<Category[]>([]);
  protected readonly products = signal<Product[]>([]);
  protected readonly page = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected readonly selectedCategory = signal('');
  protected readonly appliedSearch = signal('');
  protected searchText = '';

  constructor() {
    this.categoryService.getCategories().subscribe({
      next: categories => this.categories.set(categories),
    });
    this.loadProducts();
  }

  protected selectCategory(slug: string): void {
    this.selectedCategory.set(slug);
    this.page.set(0);
    this.loadProducts();
  }

  protected onSearch(): void {
    this.appliedSearch.set(this.searchText.trim());
    this.page.set(0);
    this.loadProducts();
  }

  protected clearSearch(): void {
    this.searchText = '';
    this.onSearch();
  }

  protected goToPage(pageNumber: number): void {
    this.page.set(pageNumber);
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    this.productService
      .getProducts({
        page: this.page(),
        size: 12,
        category: this.selectedCategory() || undefined,
        q: this.appliedSearch() || undefined,
      })
      .subscribe({
        next: result => {
          this.products.set(result.content);
          this.totalPages.set(result.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load products. Please try again.');
          this.loading.set(false);
        },
      });
  }
}