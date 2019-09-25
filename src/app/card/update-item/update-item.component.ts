import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {distinctUntilChanged, tap} from 'rxjs/operators';

import {Card} from '../card.model';
import {CardService} from '../card.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit, OnDestroy {
  card: Card = this.getNewCardInstance;
  cardForm: FormGroup;
  @ViewChild('name', {static: false}) name: ElementRef;
  private pushCardSub$: Subscription;

  constructor(private formBuilder: FormBuilder, private cardService: CardService) {
  }


  ngOnInit() {
    this.createForm();
    this.pushCardSub$ = this.cardService
      .pushCard$
      .pipe(
        distinctUntilChanged(),
        tap(item => {
          this.card = item || this.getNewCardInstance;
          this.createForm();
        })
      )
      .subscribe();

  }

  private createForm(): void {
    this.cardForm = this.formBuilder.group(
      {
        name: [null, Validators.required],
        description: [null],
        id: [null],
        status: [null],
      }
    );

    this.cardForm.patchValue(this.card as any);
  }

  get getNewCardInstance() {
    return new Card(null, null, null, 'todo');
  }

  cancel() {
    this.card = this.getNewCardInstance;
    this.cardForm.patchValue(this.card as any);
    this.name.nativeElement.focus();
  }

  onSubmit() {
    this.cardService.actionCard$.next(this.cardForm.value);
    this.cancel();
  }

  ngOnDestroy(): void {
    this.pushCardSub$.unsubscribe();
  }

}
