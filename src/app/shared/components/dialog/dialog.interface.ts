export interface PopupDialogBaseData {
  title: string;
  description?: string;
  primaryLabel: string;
  secondaryLabel?: string;
}

export interface PopupDialogData extends PopupDialogBaseData {
  time?: number;
  disableClose: boolean;
  afterClosed?: (...args: []) => unknown;
}
