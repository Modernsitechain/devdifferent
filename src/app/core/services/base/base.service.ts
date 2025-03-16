import { Injectable } from '@angular/core';
import { MediaInterface } from '@core/interfaces';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  // protected uploadFile(
  //   basePath: string,
  //   file: MediaInterface
  // ): Observable<any> {
  //   return file.value
  //     ? from(
  //         uploadData({
  //           path: basePath + file.title,
  //           data: file.value
  //         }).result
  //       )
  //     : of({
  //         path: file.url
  //       });
  // }

  // protected removeFile(path: string): Observable<RemoveWithPathOutput> {
  //   return from(
  //     remove({
  //       path: path
  //     })
  //   );
  // }
}
