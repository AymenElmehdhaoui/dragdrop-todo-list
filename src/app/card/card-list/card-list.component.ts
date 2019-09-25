import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {map, shareReplay} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

import {Card} from '../card.model';
import {CardService} from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  card = {};
  private actionCard$: Subscription;
  list$: Observable<any> = this.cardService
    .getTaskList()
    .pipe(
      shareReplay(),
      map(
        items => {
          this.todo.push(...items.filter(item => item.status === 'todo'));
          this.done.push(...items.filter(item => item.status === 'done'));
          this.doing.push(...items.filter(item => item.status === 'doing'));
          return;
        }
      )
    );
  todo = [];
  done = [];
  doing = [];

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.actionCard$ = this.cardService
      .actionCard$
      .subscribe((item: Card) => {
        if (item.id) {

          const updateCard = (v: Card) => {
            if (v.id === item.id) {
              v.name = item.name;
              v.description = item.description;
            }
            return v;
          };

          if (item.status === 'doing') {
            this.doing.map(updateCard);
          } else if (item.status === 'done') {
            this.done.map(updateCard);
          } else {
            this.todo.map(updateCard);
          }
        } else {
          // create
          item.id = Math.random();
          this.todo.push(item);
          console.log(item);
        }
      });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.semiteBackEndAPi(event.container.id);
    }
  }

  private semiteBackEndAPi(status: string): void {
    if (status === 'done') {
      this.done.map((item: Card) => item.status = 'done');
    } else if (status === 'todo') {
      this.todo.map((item: Card) => item.status = 'todo');
    } else {
      this.doing.map((item: Card) => item.status = 'doing');
    }
    this.cardService.pushCard$.next();
  }

  ngOnDestroy(): void {
    this.actionCard$.unsubscribe();
  }

}
