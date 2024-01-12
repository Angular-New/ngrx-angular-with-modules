import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@auth/services';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '@auth/store/actions';
import { EPersistence, PersistenceService } from '@shared/services';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class LoginEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _persistenceService = inject(PersistenceService);

  _login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this._authService.login(request).pipe(
          map((response: CurrentUserInterface) => {
            const { token } = response;
            this._persistenceService.setToken(EPersistence.AccessToken, token);

            return loginSuccessAction({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  _loginAfterSuccess = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this._router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
