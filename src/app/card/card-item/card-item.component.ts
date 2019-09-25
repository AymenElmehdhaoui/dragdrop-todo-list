import {Component, Input, OnInit} from '@angular/core';

import {Card} from '../card.model';
import {CardService} from '../card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;
  show = false;

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
    this.cardService.pushCard$.next(this.card);
  }

  get getClass(): string {
    if (this.card.status === 'done') {
      return 'alert-success';
    } else if (this.card.status === 'doing') {
      return 'alert-primary';
    } else {
      return 'alert-warning';
    }
  }

}
