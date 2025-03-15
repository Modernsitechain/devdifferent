import { FormGroup } from '@angular/forms';
import { Observable, Subject, finalize } from 'rxjs';

export abstract class FormBase<T, R = T>{

  public abstract form: FormGroup;

  /**
   * When the submit was successfull
   */
  public readonly success$ = new Subject<R>();

  /**
   * Emits when there was a error while submitting
   */
  public readonly error$ = new Subject<unknown>();

  /**
   * Returns the private value _loading
   */
  public get loading(): boolean {
    return this._loading;
  }

  /**
   * Checks if the form can be submitted
   */
  public get canSubmit(): boolean {
    return this.form.dirty && this.form.valid;
  }

  /**
   * Abstract function that will be called when submit method is triggered
   */
  protected abstract onSubmit(item: T): Observable<R | undefined>;

  private _loading = false;

  /**
   * Method that will check if the form can be submitted and if so triggers the abstract function
   */
  public submit(): void {
    if (!this.canSubmit) {
      this.markFormAsTouched();
      return;
    }

    this.setLoading(true);

    this.onSubmit(this.getValue())
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (result) => {
          if (result !== undefined) {
            this.success$.next(result);
          }
        },
        error: (error) => {
          this.error$.next(error);
        }
      });
  }

  /**
   * Returns the raw value of the form
   */
  protected getValue(): T {
    return this.form.getRawValue() as T;
  }

  /**
   * Method that will set the loading property and will disable or enable the form based on the value
   */
  protected setLoading(loading: boolean): void {
    this._loading = loading;

    if (loading) {
      this.resetError();
      // this.disableForm();
    } else {
      this.enableForm();
    }
  }

  /**
   * Marks form and all control as touched
   */
  private markFormAsTouched(): void {
    this.form.markAllAsTouched();
  }

  /**
   * Disabled the form
   */
  private disableForm(emitEvent = true): void {
    this.form.disable({ emitEvent });
  }

  /**
   * Enables the form
   */
  private enableForm(emitEvent = true): void {
    this.form.enable({ emitEvent });
  }

  /**
   * Resets the error
   */
  private resetError(): void {
    this.error$.next(undefined);
  }
}
