import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Property } from '../interfaces/properties';
import { apiURL } from '../utilities/app.const';

@Injectable({
  providedIn: 'root',
})
export class PropertiesServiceService {
  endPointUrl = apiURL;
  constructor(public http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(
        'https://65806b0d6ae0629a3f552390.mockapi.io/api/properties'
      )
      .pipe(
        tap((resp) => {
          resp = new Array<Property>();
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  updateProperties(property: Property) {
    return this.http
      .put<Property>(this.endPointUrl + `/${property.id}`, property)
      .pipe(
        tap(() => {}),
        catchError((err) => {
          return of(err);
        })
      );
  }

  deleteProperty(id: number) {
    console.log('id', id);
    return this.http.delete(this.endPointUrl + `/${id}`).pipe(
      tap(() => {}),
      catchError((err) => {
        return of(err);
      })
    );
  }
  addProperty(property: Property) {
    console.log('i am from service property:', property);
    return this.http.post(this.endPointUrl, property).pipe(
      tap(() => {}),
      catchError((err) => {
        return of(err);
      })
    );
  }
}
