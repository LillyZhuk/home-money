import { Component, OnInit } from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {CategoryService} from '../../shared/services/category.service';
import {EventsService} from '../../shared/services/events.service';
import {combineLatest} from 'rxjs';
import {AppEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {

  public  isLoaded: boolean = false;
  public bill: Bill;
  public categories: Category[] = [];
  public events: AppEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private eventsServie: EventsService
  ) { }

  ngOnInit() {
    combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsServie.getEvents()
    ).subscribe((data: [Bill, Category[], AppEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  public getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  public getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    let percent = this.getPercent(cat);
    let color;
    return color = percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }
}
