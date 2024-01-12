import { createReducer, on } from '@ngrx/store';

import {
  fetchUserAction,
  fetchUserFailure,
  fetchUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '@auth/store/actions';
import { AuthStateInterface } from '@auth/types';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
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
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state: AuthStateInterface, { response }): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: response,
    })
  ),
  on(
    registerFailureAction,
    (state: AuthStateInterface, { errors }): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  ),
  on(
    loginAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state: AuthStateInterface, { response }): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: response,
    })
  ),
  on(
    loginFailureAction,
    (state: AuthStateInterface, { errors }): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  ),
  on(
    fetchUserAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    fetchUserSuccessAction,
    (state: AuthStateInterface, { response }): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response,
    })
  ),
  on(
    fetchUserFailure,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  )
);
