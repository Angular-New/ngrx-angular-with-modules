import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '@auth/services';
import {
  fetchUserAction,
  fetchUserFailure,
  fetchUserSuccessAction,
} from '@auth/store/actions';
import { EPersistence, PersistenceService } from '@shared/services';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class FetchUserEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _persistenceService = inject(PersistenceService);

  _fetchUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchUserAction),
      switchMap(() => {
        // проверка наличия токена в local storage
        const token: unknown = this._persistenceService.getToken(
          EPersistence.AccessToken
        );
        // local storage не имеет токена, не вызываем метод fetchCurrentUser сервиса PersistenceService для запроса на бекенд (оптимизация приложения)
        if (!token) {
          return of(fetchUserFailure());
        }

        return this._authService.fetchCurrentUser().pipe(
          map((response: CurrentUserInterface) => {
            return fetchUserSuccessAction({ response });
          }),
          catchError(() => of(fetchUserFailure()))
        );
      })
    )
  );
}
