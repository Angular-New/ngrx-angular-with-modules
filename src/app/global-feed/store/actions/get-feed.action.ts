import { createAction, props } from '@ngrx/store';

import { ActionFeedTypes } from '@feed/store/actions/types';
import { FeedResponseInterface } from '@feed/types';

export const getFeedAction = createAction(
  ActionFeedTypes.Feed,
  props<{ request: string }>()
);

export const getFeedActionSuccess = createAction(
  ActionFeedTypes.FeedSuccess,
  props<{ response: FeedResponseInterface }>()
);

export const getFeedActionFailure = createAction(ActionFeedTypes.FeedFailure);
