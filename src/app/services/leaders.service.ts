import { Injectable } from '@angular/core';
import { leader } from '../../shared/leader';
import { LEADERS } from '../../shared/leaders';

@Injectable()
export class LeadersService {

  constructor() { }

  getLeaders(): leader[] {
    return LEADERS;
  }


  getFeaturedLeader(): leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }

}

