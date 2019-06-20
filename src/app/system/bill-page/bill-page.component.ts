import {Component, OnDestroy, OnInit} from '@angular/core';
import { BillService } from '../../shared/services/bill.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  public sub1: Subscription;
  public sub2: Subscription;
  public currency: any;
  public bill: Bill;
  public isLoaded: boolean = false;


  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest( // изменилось к 7 версии
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency().subscribe(
      (currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sub1 && this.sub2) {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
    }
  }

}
