import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Circle } from '../models/circle.model';
import { Division } from '../models/division.model';
import { SubDivision } from '../models/subDivision.model';
import { Section } from '../models/section.model';
// import { Roles } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  serverUrl = environment.baseURL;

  circles: Circle = null;
  circleSubject = new Subject<Circle>();

  divns: Division = null;
  divnSubject = new Subject<Division>();

  subDivns: SubDivision = null;
  subDivnSubject = new Subject<SubDivision>();

  sections: Section = null;
  sectionSubject = new Subject<Section>();

  constructor(private http: HttpClient) { }

  getCastes() {
    return this.http.get(`${this.serverUrl}/castes`).pipe(
      catchError(this.handleError)
    );
  }

  getDepartments() {
    return this.http.get(`${this.serverUrl}/departments`).pipe(
      catchError(this.handleError)
    );
  }

  getDesignations() {
    return this.http.get(`${this.serverUrl}/designations`).pipe(
      catchError(this.handleError)
    );
  }

  getProfessions() {
    return this.http.get(`${this.serverUrl}/nonEngineerRoles`).pipe(
      catchError(this.handleError)
    );
  }

  getAeDesignations() {
    return this.http.get(`${this.serverUrl}/aePost`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


}
