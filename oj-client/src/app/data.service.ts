import { Injectable } from '@angular/core';
import { mockProblems } from './mock-problem';
import {ProblemModel} from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getProblems(): ProblemModel[] {
    return mockProblems;
  }

  constructor() { }
}
