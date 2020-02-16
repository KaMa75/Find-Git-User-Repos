import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://api.github.com/users';

  constructor( private http: HttpClient ) {}

  getRepos(user: string): Observable<any> {
    const queryParams = new HttpParams()
      .set('sort', 'updated')
      .set('direction', 'asc');
    return this.http.get(`${this.apiUrl}/${user}/repos`, {params: queryParams});
  }

}
