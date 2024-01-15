import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeedResponseInterface, FeedStateInterface } from '@feed/types';
import { GlobalStateInterface } from '@shared/types';

export const feedFeatureSelector = createFeatureSelector<
  GlobalStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingFeedSelector = createSelector(
  feedFeatureSelector,
  (state: FeedStateInterface): boolean => state.isLoading
);

export const dataFeedSelector = createSelector(
  feedFeatureSelector,
  (state: FeedStateInterface): FeedResponseInterface | null => state.data
);

export const errorFeedSelector = createSelector(
  feedFeatureSelector,
  (state: FeedStateInterface): string | null => state.error
);
