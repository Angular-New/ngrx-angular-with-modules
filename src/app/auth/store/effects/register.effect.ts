import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '@auth/store/actions';
import { CurrentUserInterface } from '@shared/types';
import { AuthService } from '@auth/services';

@Injectable()
export class RegisterEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);

  _register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this._authService.register(request).pipe(
          map((user: CurrentUserInterface) => {
            return registerSuccessAction({ user });
          }),
          catchError(() => {
            return of(registerFailureAction());
          })
        );
      })
    )
  );
}
