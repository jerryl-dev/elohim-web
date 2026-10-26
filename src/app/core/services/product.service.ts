import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Page } from '../models/page.model';
import { Product } from '../models/product.model';

export interface ProductQuery {
  page?: number;
  size?: number;
  category?: string;
  q?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts(query: ProductQuery = {}): Observable<Page<Product>> {
    let params = new HttpParams();

    if (query.page !== undefined) params = params.set('page', query.page);
    if (query.size !== undefined) params = params.set('size', query.size);
    if (query.category) params = params.set('category', query.category);
    if (query.q) params = params.set('q', query.q);

    return this.http.get<Page<Product>>('/api/products', { params });
  }
}