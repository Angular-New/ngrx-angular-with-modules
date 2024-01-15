import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FeedService } from '@feed/services';
import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from '@feed/store/actions';
import { FeedResponseInterface } from '@feed/types';

@Injectable()
export class GetFeedEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _feedService: FeedService = inject(FeedService);

  _getFeed$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this._feedService.getFeed(url).pipe(
          map((response: FeedResponseInterface) => {
            return getFeedActionSuccess({ response });
          }),
          catchError(() => of(getFeedActionFailure()))
        );
      })
    )
  );
}
