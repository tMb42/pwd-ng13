import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError, Observable, forkJoin,  } from 'rxjs';
import { Engrs } from '../models/engrs.model';
import { environment } from '../../environments/environment';

const serverUrl = `${environment.baseURL}/engineers`;

export interface ValidatorErrorResponse {
  workName?: string;
  dlps_id?: number;
}

export interface EngineersResponseData {
  success: number;
  engrsData: Engrs;
  message?: any;
  error: ValidatorErrorResponse ;
  total?: number;
  per_page?: number;
  current_page?: number;
  total_pages?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EngineersService {
  engrs: Engrs[] = [];
  engrsSubject = new Subject<Engrs[]>();

  constructor(private http: HttpClient) {
    this.http.get(`${serverUrl}/engrs`).subscribe((response: any) => {
      this.engrs = response.engineers.data;
      this.engrsSubject.next([...this.engrs]);
    });
  }


  getEngrsUpdateListener() {
    return this.engrsSubject.asObservable();
  }

  //----------------------------------------------------------------------------

  getEngineers(): Observable<Engrs[]> {
    return this.http.get<Engrs[]>(serverUrl)
  }

  updateEngineer(engrs: Engrs): Observable<Engrs> {
    return this.http.patch<Engrs>(`${serverUrl}/${engrs.id}`, engrs);
  }

  addEngineer(user: Engrs): Observable<Engrs> {
    return this.http.post<Engrs>(serverUrl, user);
  }

  deleteEngineer(id: number): Observable<Engrs> {
    return this.http.delete<Engrs>(`${serverUrl}/${id}`);
  }

  deleteEngineers(engrs: Engrs[]): Observable<Engrs[]> {
    return forkJoin(engrs.map(engrs => this.http.delete<Engrs>(`${serverUrl}/${engrs.id}`)))
  }

  //-------------------------------------------------------------------------

  getTemporaryEngineersDraftList(data: any) {
    return this.http.post<Engrs[]>(`${serverUrl}/jeDraftList?page=${data.page}`, { params: { per_page: data.itemsPerPage, ids: data.selectedJe }});
  }

  //----------------------------------------------------------------------------------------------------------

  getAllEngineersData(data: any) {
    return this.http.get<Engrs[]>(`${serverUrl}/engrs?page=${data.page}`, { params: { per_page: data.itemsPerPage }});
  }

  getSearchData(event: any) {
    return this.http.get<Engrs[]>(`${serverUrl}/search/${event}`);
  }

  getEngrsDetailsById(id: string) {
    return this.http.get<Engrs>(`${serverUrl}/engrs/${id}`);
   }

  saveTenderDetails(newServiceData: any) {
    return this.http.post<EngineersResponseData>(`${serverUrl}/engrs/serviceData`, newServiceData)
    .pipe(catchError(this.handleError), tap((res: EngineersResponseData) => {
        this.engrs.unshift(res.engrsData);
        this.engrsSubject.next([...this.engrs]);
      })
    );
  }

  updateEngineerServiceData(serviceData: any) {
    return this.http.put<EngineersResponseData>(`${serverUrl}/engrs/${serviceData.id}`, serviceData)
    .pipe(catchError(this.handleError), tap((response: EngineersResponseData) => {
      if (response.success === 1){
        const index = this.engrs.findIndex(x => x.id === serviceData.id);
          this.engrsSubject[index] = response.engrsData;
          this.engrsSubject.next([...this.engrs]);
          console.log(this.engrsSubject[index]);
        }
    }));
  }

  getAllJeEngineersData(data: any) {
    return this.http.get<Engrs[]>(`${serverUrl}/jengrs?page=${data.page}`, { params: { per_page: data.itemsPerPage }});
  }

  getAllActiveJeList(data: any) {
    return this.http.get<Engrs[]>(`${serverUrl}/jeActive?page=${data.page}`, { params: { per_page: data.itemsPerPage }});
  }

   private handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       // A client-side or network error occurred. Handle it accordingly.
       console.error('An error occurred:', error.error.message);
    } else {
      // T he backend returned an unsuccessful response code.
      // The  response body may contain clues as to what went wrong.
      console. error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
     // Return an observable with a user-facing error message.
     return throwError(error);
  }


 }
