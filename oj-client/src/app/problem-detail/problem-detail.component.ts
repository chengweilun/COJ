import {Component, Inject, OnInit} from '@angular/core';
import { ProblemModel } from '../problem.model';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  problem: ProblemModel;

  constructor(@Inject('data') private data, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProblem();
  }


  getProblem(): void {
    let id;
    this.route.params.subscribe(params => {
      id = +params['id'];
    });
    this.data.getProblem(id)
      .subscribe(pro => this.problem = pro);
  }

}
