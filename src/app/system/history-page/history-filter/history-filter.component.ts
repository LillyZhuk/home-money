import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/models/category';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];
  public selectedPeriod = 'd';
  public selectedTypes = [];
  public selectedCategories = [];
  public timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];
  public types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.filterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType(target) {
    this.calculateInputParams('selectedTypes', target.checked, target.value);
  }

  handleChangeCategory(target) {
    this.calculateInputParams('selectedCategories', target.checked, target.value);
  }

  appleFilter() {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
