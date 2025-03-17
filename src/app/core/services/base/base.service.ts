import { Injectable } from '@angular/core';
import { MediaInterface } from '@core/interfaces';
import {
  downloadData,
  DownloadDataWithPathInput,
  DownloadDataWithPathOutput,
  remove,
  RemoveWithPathInput,
  RemoveWithPathOutput,
  uploadData,
} from 'aws-amplify/storage';
import { from, Observable, of } from 'rxjs';
import { Amplify } from 'aws-amplify';
import outputs from 'amplify_outputs.json';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private baseUrl = environment.baseUrl;
  constructor(protected http: HttpClient) {
    Amplify.configure(outputs);
  }

  protected getAPI<T, R = T>(endpoint: string, params?: T): Observable<any> {
    let httpParams = new HttpParams();

    const url = this.baseUrl + endpoint;

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = (params as any)[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    const headers = new HttpHeaders({});

    return this.http.get(url, {
      params: httpParams,
      headers: headers,
    });
  }

  protected postAPI<T>(
    endpoint: string,
    payload: T,
    params?: T
  ): Observable<any> {
    let httpParams = new HttpParams();

    const url = this.baseUrl + endpoint;

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = (params as any)[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.post(url, payload);
  }

  protected deleteAPI<T>(
    endpoint: string
  ): Observable<any> {
    const path = this.baseUrl + endpoint;

    return this.http.delete(path);
  }

  protected uploadFile(
    basePath: string,
    file: Partial<MediaInterface>
  ): Observable<any> {
    return file.value
      ? from(
          uploadData({
            path: basePath + file.title,
            data: file.value,
          }).result
        )
      : of({
          path: file.url,
        });
  }

  protected removeFile(
    input: RemoveWithPathInput
  ): Observable<RemoveWithPathOutput> {
    return from(remove(input));
  }

  protected downloadFile(
    _path: string
  ): Observable<any> {
    return from(downloadData({
      path: _path
    }).result);
  }
}
