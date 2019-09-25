import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {Card} from './card.model';
import {TASK_LIST} from './card-list';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public pushCard$: Subject<Card> = new Subject();
  public actionCard$: Subject<Card> = new Subject();

  constructor() {
  }

  getTaskList(): Observable<Card[]> {
    return of<Card[]>(TASK_LIST);
  }
}
