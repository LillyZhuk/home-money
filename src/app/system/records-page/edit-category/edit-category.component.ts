import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../../shared/models/category';
import {CategoryService} from '../../../shared/services/category.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();
  public currentCategoryId: number = 1;
  public currentCategory: Category;
  public category = {
    capacity: null,
    name: '',
    id: null
  };
  public message: Message;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.message = new Message('', 'success');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(
      c => c.id === +this.currentCategoryId
    );
  }

  onSubmit(form: NgForm) {
    this.category.name = form.value.name;
    this.category.capacity = form.value.capacity;
    if (this.category.capacity < 0) this.category.capacity *= -1;
    this.category.id = +this.currentCategoryId;
    this.categoryService.updateCategory(this.category). subscribe(
      (category: Category) => {
       this.categoryEdit.emit(this.category);
       this.message.text = 'Категория успешно отредактирована.';
       setTimeout(() => {
         this.message.text = '';
       }, 5000);
      }
    );
  }

}
