import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { BasePortalOutlet, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupDialogComponent } from '@app/shared/components/dialog/popup-dialog/popup-dialog.component';
import { PopupDialogBaseData, PopupDialogData } from '@app/shared/components/dialog/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: Dialog) {}

  /**
   * Open a custom dialog by providing a component
   */
  public open<T, R = T>(
    component: ComponentType<unknown>,
    data?: T,
    disableClose = false,
    center = false
  ): Observable<R> {
    const config = this.getConfig({ data, disableClose });
    if (center) {
      config.panelClass = 'dialog-container-center';
    }
    const dialog = this.dialog.open(component, config);

    return dialog.closed as Observable<R>;
  }

  /**
   * Opens dialog that returns its Ref
   */
  public openWithCompRef<T>(
    component: ComponentType<unknown>,
    data?: T,
    disableClose = false,
    center = false
  ): DialogRef<unknown, unknown> {
    const config = this.getConfig({ data, disableClose });
    if (center) {
      config.panelClass = 'dialog-container-center';
    }
    const dialog = this.dialog.open(component, config);

    return dialog;
  }

  /**
   * Opens a countdown dialog
   */
  public openCountdown(
    data: PopupDialogBaseData,
    time: number,
    disableClose = false,
    afterClosed?: (...args: []) => unknown
  ): Observable<boolean> {
    const extendedData: PopupDialogData = {
      ...data,
      disableClose,
      time,
      afterClosed
    };
    const dialog = this.dialog.open(
      PopupDialogComponent,
      this.getConfig({
        data: extendedData,
        autoFocus: false,
        disableClose: disableClose
      })
    );
    return dialog.closed as Observable<boolean>;
  }

  /**
   * Opens a confirm dialog
   */
  public openPopup(
    data: PopupDialogBaseData,
    disableClose = false,
    afterClosed?: (...args: []) => unknown
  ): Observable<boolean> {
    const extendedData: PopupDialogData = {
      ...data,
      disableClose,
      afterClosed
    };
    const dialog = this.dialog.open(
      PopupDialogComponent,
      this.getConfig({
        data: extendedData,
        autoFocus: false,
        disableClose: disableClose
      })
    );
    return dialog.closed as Observable<boolean>;
  }

  /**
   * Returns the default dialog config
   */
  private getConfig(
    config?: Partial<
      DialogConfig<unknown, DialogRef<unknown, unknown>, BasePortalOutlet>
    >
  ): DialogConfig<unknown, DialogRef<unknown, unknown>, BasePortalOutlet> {
    return {
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'dialog-container',
      backdropClass: 'dialog-backdrop',
      disableClose: false,
      maxHeight: '100%',
      maxWidth: '100%',
      ...config
    };
  }
}
