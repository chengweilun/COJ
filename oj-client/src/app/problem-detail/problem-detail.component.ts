import { Component, OnInit } from '@angular/core';
import { ProblemModel } from '../problem.model';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  problem: ProblemModel;

  constructor() { }

  ngOnInit() {
  }

}
