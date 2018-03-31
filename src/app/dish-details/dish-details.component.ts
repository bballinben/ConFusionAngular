import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../shared/dish';
import { MenuComponent } from '../menu/menu.component';
import { DatePipe } from '@angular/common';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

  dish: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dish[id] = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }


}
