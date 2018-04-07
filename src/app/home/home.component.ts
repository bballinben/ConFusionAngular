import { Component, OnInit, Inject } from '@angular/core';
import { leader } from '../../shared/leader';
import { LEADERS } from '../../shared/leaders';
import { Dish } from '../../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeadersService} from '../services/leaders.service'
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: leader;
  dishErrMess: string;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL, 
    private promotionservice: PromotionService,
    private leadersservice: LeadersService) { }

  ngOnInit() {

    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmess => this.dishErrMess = <any>errmess);
    this.leadersservice.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.dishErrMess = <any>errmess);
  }

}