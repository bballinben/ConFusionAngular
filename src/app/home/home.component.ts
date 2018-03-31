import { Component, OnInit } from '@angular/core';
import { leader } from '../../shared/leader';
import { LEADERS } from '../../shared/leaders';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeadersService} from '../services/leaders.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leadersservice: LeadersService) { }

  ngOnInit() {

    this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.leadersservice.getFeaturedLeader().then(leader => this.leader = leader);
  }

}