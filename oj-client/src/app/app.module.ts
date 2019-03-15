import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { DataService } from './data.service';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { routing } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { NewProblemComponent } from './new-problem/new-problem.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NavbarComponent,
    NewProblemComponent,
    EditorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    routing,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
