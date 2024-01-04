import { AuthStateInterface } from '@auth/types';
import { createReducer, on } from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '@auth/store/actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const registerFeatureKey: string = 'auth';

export const registerReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      currentUser: null,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state: AuthStateInterface, { response }): AuthStateInterface => ({
      ...state,
      currentUser: response,
      isLoggedIn: true,
      isSubmitting: false,
    })
  ),
  on(
    registerFailureAction,
    (state: AuthStateInterface, { errors }): AuthStateInterface => ({
      ...state,
      validationErrors: errors,
      isLoggedIn: false,
      isSubmitting: false,
    })
  )
);
