import { inject, Injectable } from '@angular/core';
import { Content } from '@feature/cms/models';
import { Observable, of } from 'rxjs';
import { AwsS3Service } from '../aws-s3/aws-s3.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly awsS3Service = inject(AwsS3Service);
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
