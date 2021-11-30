import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs"
import { MatDialog} from "@angular/material/dialog";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = "unknown error"
        if(err.error.status.message){
          errorMessage = err.error.status.message
        }
        this.dialog.open(ErrorComponent, {data:{message: errorMessage}})
        return throwError(err);
      })
    );
  };
}
