import { AuthStateInterface } from '@auth/types';
import { createReducer, on } from '@ngrx/store';
import { registerAction } from '@auth/store/actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

export const registerFeatureKey: string = 'auth';

export const registerReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
);
