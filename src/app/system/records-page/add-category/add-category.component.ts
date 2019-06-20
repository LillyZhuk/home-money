import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() categoryAdd = new EventEmitter<Category>();

  public category = {
    name: '',
    capacity: null
  };

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.category = form.value;
    if (this.category.capacity < 0) this.category.capacity *= -1;
    this.categoryService.addCategory(this.category).subscribe(
      (category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.categoryAdd.emit(category);
      }
    );
  }

}
