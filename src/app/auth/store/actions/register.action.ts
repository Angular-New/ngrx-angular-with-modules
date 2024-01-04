import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@auth/store/actions/action.types';
import { RegisterRequestInterface } from '@auth/types';
import { CurrentUserInterface } from '@shared/types';

export const registerAction = createAction(
  ActionTypes.Register,
  props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.RegisterSuccess,
  props<{ user: CurrentUserInterface }>()
);

export const registerFailureAction = createAction(ActionTypes.RegisterFailure);
