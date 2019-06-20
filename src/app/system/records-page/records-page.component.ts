import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../../shared/services/category.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  public categories: Category[] = [];
  public isLoaded: boolean = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      }
    );
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const index = this.categories.findIndex( c => c.id === category.id);
    this.categories[index] = category;
  }

}
