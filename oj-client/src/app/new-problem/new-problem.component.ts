import {Component, Inject, OnInit} from '@angular/core';
import { ProblemModel } from '../problem.model';
import { Location } from '@angular/common';


const DEFAULT_PROBLEM: ProblemModel = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: 'Easy'
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  public difficulties = ['Easy', 'Medium', 'Hard', 'Super'];
  newProblem: ProblemModel = Object.assign({}, DEFAULT_PROBLEM);
  constructor(@Inject('data') private data, private location: Location) { }

  ngOnInit() {
  }

  addNewProblem(): void {
    console.log(this.newProblem);
    this.data.addProblem(this.newProblem).subscribe();
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
    // this.location.back();
  }

}
