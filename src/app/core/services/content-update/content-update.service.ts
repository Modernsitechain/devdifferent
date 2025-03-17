import { Injectable, signal } from '@angular/core';
import { Content } from '@feature/cms/models';

@Injectable({
  providedIn: 'root',
})
export class ContentUpdateService {
  private currentContent = signal<Content.Base | undefined>(undefined);

  constructor() {}

  public getCurrentContent() {
    return this.currentContent();
  }

  public setCurrentContent(data: Content.Base) {
    this.currentContent.set(data);
  }
}
