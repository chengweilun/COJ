import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { DataService } from './data.service';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
