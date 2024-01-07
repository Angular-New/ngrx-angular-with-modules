import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@auth/store/actions/action.types';
import { LoginRequestInterface } from '@auth/types';
import { CurrentUserInterface, ResponseErrorsInterface } from '@shared/types';

export const loginAction = createAction(
  ActionTypes.Login,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LoginSuccess,
  props<{ response: CurrentUserInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LoginFailure,
  props<{ errors: ResponseErrorsInterface }>()
);
