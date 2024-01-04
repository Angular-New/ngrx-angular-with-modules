import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { API_URL } from '@shared/tokens';
import {
  RegisterRequestInterface,
  RegisterResponseInterface,
} from '@auth/types';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class AuthService {
  private readonly _apiUrl: string = inject(API_URL);
  private readonly _http: HttpClient = inject(HttpClient);

  /**
   * Register new user
   * @param data
   */
  public register(
    data: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    console.log('data >>> ', data);
    const url: string = `${this._apiUrl}/users`;
    const body: { user: RegisterRequestInterface } = { user: { ...data } };

    return this._http
      .post<RegisterResponseInterface>(url, body)
      .pipe(map((response: RegisterResponseInterface) => response.user));
  }
}
