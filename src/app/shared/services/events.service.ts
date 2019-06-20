import {Injectable} from '@angular/core';
import {BaseApi} from '../../core/base-api';
import {HttpClient} from '@angular/common/http';
import {AppEvent} from '../models/event.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<AppEvent[]> {
    return this.get('events');
  }
}
