import { Component, OnInit, Inject } from '@angular/core';
import {ProblemModel} from '../problem.model';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit {
  mockPro: ProblemModel[];
  constructor(@Inject( 'data' ) private data) { }

  ngOnInit() {
    this.mockPro = this.data.getProblems();
  }

}
