import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '@auth/store/actions/action.types';
import { CurrentUserInterface } from '@shared/types';

export const fetchUserAction = createAction(ActionTypes.FetchUser);

export const fetchUserSuccessAction = createAction(
  ActionTypes.FetchUserSuccess,
  props<{ response: CurrentUserInterface }>()
);

export const fetchUserFailure = createAction(ActionTypes.FetchUserFailure);
