import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  public dollar: number;
  public hryvnia: number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.hryvnia = rates['UAH'] * this.bill.value;
    console.log(this.currency);
  }

}
