import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private USERS_REST_API = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<Object> {
    return this.httpClient.get(this.USERS_REST_API);
  }

  public getUser(userId: number) {
    return this.httpClient.get(this.USERS_REST_API + '/' + userId);
  }

  public addUser(user: User) {
    return this.httpClient.post(`${this.USERS_REST_API}`, user).pipe(
      retry(0),
      catchError(this.httpError)
    );
  }

  public updateUser(user: User) {
    return this.httpClient.put(`${this.USERS_REST_API}/${user.id}`, user).pipe(
      retry(0),
      catchError(this.httpError)
    );
  }

  public deleteUser(userId: number) {
    return this.httpClient.delete(this.USERS_REST_API + '/' + userId).pipe(
      retry(0),
      catchError(this.httpError)
    );
  }

  public randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private httpError(error: any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    
    return throwError(() => new Error(msg));
  }
}
