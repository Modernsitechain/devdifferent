import { catchError, Observable, of } from 'rxjs';

export class Perform<T> {
  data: T | undefined;
  isLoading = false;
  hasError = false;
  private action$: Observable<T> | undefined;

  public load(action$: Observable<T>, print = false): void {
    this.isLoading = true;
    this.hasError = false;
    this.action$ = action$;
    this.action$
      .pipe(
        catchError((error) => {
          this.data = undefined;
          this.isLoading = false;
          this.hasError = true;
          return of(error);
        })
      )
      .subscribe({
        next: (data: T) => {
          this.data = data;
          this.isLoading = false;
          this.hasError = false;
          if(print){
            console.log("p!, ", data);
          } 
        },
        error: (err) => {
          
        }
      });
  }
}
