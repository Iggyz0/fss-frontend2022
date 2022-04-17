import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { JwttokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private jwtTokenService: JwttokenService, private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    // const userToken = this.jwtTokenService.jwtToken ? this.jwtTokenService.jwtToken : "";

    const modifiedRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${userToken}`)
    });

    if(this.jwtTokenService.isTokenExpired()) {
      this.authService.logout();
      this._snackBar.open("Session expired, please log in again.", "", { duration: 2500 });
      this.router.navigate(["login"]);
      return throwError("Session expired, please log in again.");
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.status == 401 || error.status == 403) {
          // console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          // console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(errorMsg);
      })
    )
  }
}
