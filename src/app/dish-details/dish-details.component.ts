import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../shared/dish';
import { MenuComponent } from '../menu/menu.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

  @Input()
  dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
