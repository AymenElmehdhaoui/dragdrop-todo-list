import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {InputsModule} from '@progress/kendo-angular-inputs';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardListComponent} from './card/card-list/card-list.component';
import {CardItemComponent} from './card/card-item/card-item.component';
import {UpdateItemComponent} from './card/update-item/update-item.component';


@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CardItemComponent,
    UpdateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonsModule,
    InputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
