import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  formatError(error: any) {
    if (error.error.message) {
      return throwError(() => error.error.message);
    } else {
      return throwError(() => error.message);
    }
  }
}
