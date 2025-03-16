import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressNumber = signal<number>(0);
  private progressMessage = signal<string>('uploading data...');

  constructor() {}

  public getProgress() {
    return this.progressNumber();
  }

  public getMessage() {
    return this.progressMessage();
  }

  public setProgress(number: number, message?: string) {
    this.progressNumber.set(number);
    if (message) {
      this.progressMessage.set(message);
    }
  }
}
