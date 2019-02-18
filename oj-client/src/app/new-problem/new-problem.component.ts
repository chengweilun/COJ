import {Component, Inject, OnInit} from '@angular/core';
import { ProblemModel } from '../problem.model';


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
  constructor(@Inject('data') private data) { }

  ngOnInit() {
  }

  addNewProblem(): void {
    this.data.addProblem(this.newProblem).subscribe();
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
