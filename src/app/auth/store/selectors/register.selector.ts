import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '@auth/types';
import { GlobalStateInterface } from '@shared/types';

export const registerFeatureSelector = createFeatureSelector<
  GlobalStateInterface,
  AuthStateInterface
>('auth');

export const isSubmittingSelector = createSelector(
  registerFeatureSelector,
  (state: AuthStateInterface): boolean => state.isSubmitting
);
