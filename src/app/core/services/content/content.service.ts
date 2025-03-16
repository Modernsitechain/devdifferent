import { Injectable } from '@angular/core';
import { Content } from '@feature/cms/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor() {}

  public createContent(_payload: Content.FormContentCreate):Observable<any> {
    return of();
  }

  public updateContent(_payload: Content.FormContentUpdate):Observable<any> {
    return of();
  }

  public deleteContent(_payload: Content.FormContentDelete):Observable<any> {
    return of();
  }
}
