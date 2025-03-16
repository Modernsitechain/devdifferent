import { Injectable } from '@angular/core';
import { getUrl } from 'aws-amplify/storage';
import { from, map, Observable } from 'rxjs';

interface MediaValidationTermsInterface {
  maxSizeMb: number;
  fileType: string;
  maxWidth: number;
  maxHeight: number;
}
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  public readonly STICKER_DATA: MediaValidationTermsInterface = {
    maxSizeMb: 0.1,
    fileType: '.webp',
    maxWidth: 512,
    maxHeight: 512
  };

  public readonly MAX_HACK_THUMBNAIL_SIZE_MB = 1;
  public readonly MAX_HACK_VIDEO_SIZE_MB = 10;
  public readonly MAX_INSIGHT_THUMBNAIL_SIZE_MB = 1;
  public readonly MAX_INSIGHT_VIDEO_SIZE_MB = 1;

  constructor() {}

  public getMaxMediaSizeInput(mediaSize: number): number {
    return mediaSize * 1024 * 1024;
  }

  public getMediaUrl(path: string): Observable<string> {
    return from(
      getUrl({
        path: path,
      })
    ).pipe(
      map((res) => {
        return res.url.href;
      })
    );
  }
}
