import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { news } from '../models/news';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'http://localhost:8080/api/v1/News'

  constructor(private http: HttpClient) {

  }


  getCustomers(): Observable<news[]> {
    return this.http.get<news[]>(`${this.url}`);
  }

  get(id: String): Observable<news> {
    return this.http.get<news>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  
  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

}
