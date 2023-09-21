import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private USERS_REST_API = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<Object> {
    return this.httpClient.get(this.USERS_REST_API);
  }
}
