import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProblemModel } from './problem.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DataService {

  private problemsSource = new BehaviorSubject<ProblemModel[]>([]);
  constructor(private http: HttpClient) { }

  getProblems(): Observable<ProblemModel[]> {
    this.http.get<ProblemModel[]>('api/v1/problems').
    toPromise().then((res) => {
    this.problemsSource.next(res);
    }).catch((error) => console.log(error));
    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Observable<ProblemModel> {
    return this.http.get<ProblemModel>(`api/v1/problems/${id}`).pipe(
      tap(), catchError(this.handleError<ProblemModel>('getProblem')));
  }

  addProblem(newProblem: ProblemModel): Observable<ProblemModel> {
    return this.http.post<ProblemModel>('api/v1/problems', newProblem, httpOptions).pipe(
      tap(_ => this.getProblems()), catchError(this.handleError<ProblemModel>('addProblem'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
