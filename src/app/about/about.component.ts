import { Component, OnInit } from '@angular/core';
import { leader } from '../../shared/leader';
import { LEADERS } from '../../shared/leaders';
import { LeadersService } from '../services/leaders.service';
import { MenuComponent } from '../menu/menu.component';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

leaders: leader[];

  constructor(private LeadersService: LeadersService) { }

  ngOnInit() {

    this.LeadersService.getLeaders()
      .subscribe(leaders => this.leaders = LEADERS);
  }

}

 
