import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../../shared/services/events.service';
import {CategoryService} from '../../../shared/services/category.service';
import {mergeMap} from 'rxjs/operators';
import {AppEvent} from '../../../shared/models/event.model';
import {Category} from '../../../shared/models/category';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  public event: AppEvent;
  public category: Category;

  public isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
      mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category);
      })
    ).subscribe((category: Category) => {
      this.category = category;
      this.isLoaded = true;
    });
  }

}
