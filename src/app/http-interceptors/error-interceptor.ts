import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
             switch (err.status) {
                case 403:
                    this.router.navigateByUrl('/forbidden');
                    break;
                case 404:
                    this.router.navigateByUrl('/pageNotFound');
                    break;
                            
                default:
                    break;
            }

            const error = err.error?.message || err.statusText;
            console.error(err);

            return throwError(() => error);
        }))
    }
}
