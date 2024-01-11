import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { API_URL } from '@shared/tokens';
import {
  LoginRequestInterface,
  RegisterRequestInterface,
  RegisterResponseInterface,
} from '@auth/types';
import { CurrentUserInterface } from '@shared/types';
import { AuthMapper } from '@auth/services/auth.mapper';

@Injectable()
export class AuthService {
  private readonly _apiUrl: string = inject(API_URL);
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _authMapper: AuthMapper = inject(AuthMapper);

  /**
   * Register new user
   * @param data
   */
  public register(
    data: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url: string = `${this._apiUrl}/users`;
    const body = this._authMapper.getBody(data);

    return this._http
      .post<RegisterResponseInterface>(url, body)
      .pipe(map(this._authMapper.getUser));
  }

  /**
   * Login existing user
   * @param data
   */
  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url: string = `${this._apiUrl}/users/login`;
    const body = this._authMapper.getBody(data);

    return this._http
      .post<RegisterResponseInterface>(url, body)
      .pipe(map(this._authMapper.getUser));
  }
}
