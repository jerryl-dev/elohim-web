import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private readonly productService = inject(ProductService);

  protected readonly featured = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly failed = signal(false);


  constructor() {
    this.productService.getProducts({ featured: true, size: 4 }).subscribe({
      next: page => {
        this.featured.set(page.content);
        this.loading.set(false);

      },
        error: () => {
        this.failed.set(true);
        this.loading.set(false);
      },
    });
  }
}