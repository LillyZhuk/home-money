import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../core/base-api';



@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  // getBill(): Observable<Bill> {
  //   return this.http.get<Bill>(`http://localhost:3000/bill`);
  // }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency() {
    return this.http.get<any>(`http://data.fixer.io/api/latest?access_key=156f43c852d2eb2cdca7a4ba965e720a`);
  }
}
