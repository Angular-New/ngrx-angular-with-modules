import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@auth/services';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '@auth/store/actions';
import { EPersistence, PersistenceService } from '@shared/services';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class RegisterEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _router: Router = inject(Router);
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

  _registerAfterSuccess = createEffect(
    () =>
      this._actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this._router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
