import { inject, Injectable } from '@angular/core';
import { Content } from '@feature/cms/models';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { MediaInterface } from '@core/interfaces';
import { BaseService } from '../base/base.service';
import { ProgressService } from '../progress/progress.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BaseService{
  private readonly progressService = inject(ProgressService);
  
  constructor(http: HttpClient) {
    super(http);
  }

  public getList(): Observable<Content.Base[]> {
    return from(
      this.getAPI(
        '/contents'
      ).pipe(map((res) => res))
    );
  }

  public createContent(_payload: Content.FormContentCreate):Observable<any> {
    // return of();
    this.progressService.setProgress(27, 'Uploading image...');
    return this.uploadImage(_payload.image).pipe(
      concatMap((res) => {
        console.warn('upload imge', res);
        _payload.image.url = res.path;
        delete _payload.image.value;

        this.progressService.setProgress(
          42,
          'Uploading data'
        );

        return this.postAPI(
          '/contents',
          {
            title: _payload.title,
            image: _payload.image.url
          }
        );
      }),
  
      concatMap((res) => {
        this.progressService.setProgress(
          100,
          'upload succesd'
        );
        return of(res);
      })
    );
  }

  public updateContent(_payload: Content.FormContentUpdate):Observable<any> {
    return of();
  }

  public deleteContent(_payload: Content.FormContentDelete):Observable<any> {
    return from(
      this.deleteAPI<Record<string, unknown>>(
        `/contents/${_payload._id}`
      )
    );
  }

  public uploadImage(_image: Partial<MediaInterface>) {
    const basePath = 'dev-different';
    return this.uploadFile(basePath, _image);
  }

  public deleteImage(_imageUrl: string) {
    return this.removeFile({ path: _imageUrl });
  }
}
