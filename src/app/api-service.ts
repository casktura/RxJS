import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Customer } from './customer';

interface Response<T> {
  result: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  getCustomer(length: number = 100) {
    return this.http
      .get<Response<Customer[]>>(`/api/customers/${length}`)
      .pipe(shareReplay());
  }

  getRandom() {
    return this.http.get<Response<number>>('/api/random');
  }

  getWait(time: number) {
    return this.http
      .get<Response<number>>(`/api/wait/${time}`)
      .pipe(shareReplay());
  }
}
