import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { MenuComponent } from '../menu/menu.component';
import { DatePipe } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Comment } from '../../shared/comment';


import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

  commentForm: FormGroup;
  Comment: Comment;
  rating: number;
  comment: string;
  author: string;
  date: string;


  formErrors = {
    'comment': '',
    'rating': '',
    'author': ''
  };
  validationMessages = {
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.'
    },
    'author': {
      'required':      'Authors Name is required.',
      'minlength':     'Authors Name must be at least 2 characters long.',
      'maxlength':     'Authors Name cannot be more than 25 characters long.'
    },
  };


  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
    
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(2),] ],
      rating: ['', ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const feild in this.formErrors) {
      this.formErrors[feild] = '';
      const control = form.get(feild);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[feild];
        for (const key in control.errors) {
          this.formErrors[feild] += messages[key] + '';
        }
      }
    }
  }

  onSubmit() {
    
    const commentForm = this.fb.group({
      author: this.commentForm.value.author,
      rating: this.commentForm.value.rating,
      comment: this.commentForm.value.comment
    });
    this.dish.comments.push(commentForm.value);
    console.log(commentForm.value);
    this.commentForm.reset({
      comment: '',
      rating: '',
      author: ''
    });
  }


  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }


}


