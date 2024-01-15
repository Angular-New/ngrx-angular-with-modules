import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FeedResponseInterface } from '@feed/types';
import { API_URL } from '@shared/tokens';

@Injectable()
export class FeedService {
  private readonly _apiUrl: string = inject(API_URL);
  private readonly _http: HttpClient = inject(HttpClient);

  public getFeed(url: string): Observable<FeedResponseInterface> {
    const fullUrl: string = `${this._apiUrl}${url}`;

    return this._http.get<FeedResponseInterface>(fullUrl);
  }
}
