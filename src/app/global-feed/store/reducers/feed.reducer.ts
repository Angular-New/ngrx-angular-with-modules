import { createReducer, on } from '@ngrx/store';

import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from '@feed/store/actions';
import { FeedStateInterface } from '@feed/types';

const _initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const feedFeatureKey: string = 'feed';

export const feedReducer = createReducer(
  _initialState,
  on(getFeedAction, (state: FeedStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedActionSuccess, (state: FeedStateInterface, { response }) => ({
    ...state,
    isLoading: false,
    data: response,
  })),
  on(getFeedActionFailure, (state: FeedStateInterface) => ({
    ...state,
    isLoading: false,
  }))
);
