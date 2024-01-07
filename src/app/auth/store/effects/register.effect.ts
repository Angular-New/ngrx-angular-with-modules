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
import { HttpErrorResponse } from '@angular/common/http';
import { EPersistence, PersistenceService } from '@shared/services';

@Injectable()
export class RegisterEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _persistenceService: PersistenceService =
    inject(PersistenceService);

  _register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this._authService.register(request).pipe(
          map((response: CurrentUserInterface) => {
            const { token } = response;
            this._persistenceService.setToken(EPersistence.AccessToken, token);
            return registerSuccessAction({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );
}
