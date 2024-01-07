import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '@auth/types';
import {
  CurrentUserInterface,
  GlobalStateInterface,
  ResponseErrorsInterface,
} from '@shared/types';

export const registerFeatureSelector = createFeatureSelector<
  GlobalStateInterface,
  AuthStateInterface
>('auth');

export const isSubmittingSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): boolean => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): ResponseErrorsInterface =>
    <ResponseErrorsInterface>state.validationErrors
);

export const isLoggedInSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): boolean | null => state.isLoggedIn
);

export const isAnonymousSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): boolean | null => state.isLoggedIn === false
);

export const currentUserSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): CurrentUserInterface | null => state.currentUser
);
