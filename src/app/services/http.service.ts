import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment as env } from './../../environments/environment';
import { RequestOptions } from '../shared/model/request-options.model';
import { ApiResponseInterface } from '../shared/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  isUserLoggedIn: boolean = false;

  constructor(
    private http: HttpClient ) {
  }

  private handleErrorResponse( errorResponse: HttpErrorResponse ): Observable<HttpErrorResponse> {
    return throwError(errorResponse);
  }

  private prepareRequest(query?: HttpParams, options?: RequestOptions): RequestOptions {
    const requestOptions: RequestOptions = new RequestOptions();
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.append('Content-Type', 'application/json');

    if (options) {
      requestOptions.merge(options);
    }

    if (query) {
      requestOptions.params = query;
    }

    requestOptions.withCredentials = true;
    requestOptions.headers = headers;
    return requestOptions;
  }

  get(serviceApi: string, serviceUrl: string, query?: any, path?: string, options?: RequestOptions): Observable<any> {
    const requestOptions: RequestOptions = this.prepareRequest(query, options);
    
    let url = serviceUrl ? `${env.apiBaseUrl}/${serviceApi}/${serviceUrl}` : `${env.apiBaseUrl}/${serviceApi}`;

    if (path) { url = `${url}/${path}`; }

    return this.http.get<ApiResponseInterface>(url)
        .pipe(
            map(response => response ),
            catchError(this.handleErrorResponse)
        );
  }

  post(serviceApi: string, serviceUrl: string, payload: any, path?: string, options?: RequestOptions): Observable<any> {
    const requestOptions: RequestOptions = this.prepareRequest(undefined, options);

    let url = `${env.apiBaseUrl}/${serviceApi}/${serviceUrl}`;

    if (path) { url = `${url}/${path}`; }
    
    if(serviceUrl == null)
      url = `${env.apiBaseUrl}/${serviceApi}`;

    return this.http.post<ApiResponseInterface|any>(url, payload)
        .pipe(
            map(response => response ),
            catchError(this.handleErrorResponse)
        );
  }

  put(serviceApi: string, serviceUrl: string, payload: any, query?: any, path?: string, options?: RequestOptions): Observable<any> {
    const requestOptions: RequestOptions = this.prepareRequest(query, options);

    let url = `${env.apiBaseUrl}/${serviceApi}/${serviceUrl}`;

    if (path) { url = `${url}/${path}`; }

    return this.http.put<ApiResponseInterface|any>(url, payload)
        .pipe(
            map(response => response),
            catchError(this.handleErrorResponse)
        );
  }

  delete(serviceApi: string, serviceUrl: string, path?: string, options?: RequestOptions): Observable<any> {
    const requestOptions: RequestOptions = this.prepareRequest(undefined, options);

    let url = `${env.apiBaseUrl}/${serviceApi}/${serviceUrl}`;

    if (path) { url = `${url}/${path}`; }

    return this.http.delete<ApiResponseInterface|any>(url)
        .pipe(
            map(response => response),
            catchError(this.handleErrorResponse)
        );
  }

}