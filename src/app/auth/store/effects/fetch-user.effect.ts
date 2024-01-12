import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '@auth/services';
import {
  fetchUserAction,
  fetchUserFailure,
  fetchUserSuccessAction,
} from '@auth/store/actions';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class FetchUserEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);

  _fetchUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchUserAction),
      switchMap(() => {
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
