import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../shared/models/category';
import {NgForm} from '@angular/forms';
import {AppEvent} from '../../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../../shared/services/events.service';
import {BillService} from '../../../shared/services/bill.service';
import {Bill} from '../../../shared/models/bill.model';
import {mergeMap } from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category;
  public types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  public message: Message;
  public event: AppEvent;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('', 'danger');
  }

  private showMessage(text: string) {
    this.message.text = text;
    setTimeout(() => this.message.text, 5000);
  }

  onSubmit(form: NgForm) {
    this.event = form.value;
    this.event.date =  moment().format('DD.MM.YYYY HH:mm:ss');
    this.event.category = form.value.category * 1;
    if (this.event.amount < 0) this.event.amount *= -1;

    this.billService.getBill().subscribe(
      (bill: Bill) => {
        let value = 0;
        if (this.event.type === 'outcome') {
          if (this.event.amount > bill.value) {
            this.showMessage(`Не достаточно средств. Вам не хватает ${this.event.amount - bill.value}`);
            return;
          } else {
            value = bill.value = this.event.amount;
          }
        } else {
          value = bill.value + this.event.amount;
        }
        this.billService.updateBill({value, currency: bill.currency}).pipe(
          mergeMap(() => this.eventsService.addEvent(this.event))
        ).subscribe( () => {
          form.setValue({
            type: 'outcome',
            amount: 0,
            description: ' ',
            category: 1,
          });
         });
    });
  }

}
