import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthMapper } from '@auth/services/auth.mapper';
import {
  LoginRequestInterface,
  RegisterRequestInterface,
  RegisterResponseInterface,
} from '@auth/types';
import { API_URL } from '@shared/tokens';
import { CurrentUserInterface } from '@shared/types';

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

  public fetchCurrentUser(): Observable<CurrentUserInterface> {
    const url: string = `${this._apiUrl}/user`;

    return this._http
      .get<RegisterResponseInterface>(url)
      .pipe(map(this._authMapper.getUser));
  }
}
