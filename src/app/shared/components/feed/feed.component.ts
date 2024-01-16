import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { getFeedAction } from '@feed/store/actions';
import { dataFeedSelector } from '@feed/store/selectors';
import { FeedResponseInterface } from '@feed/types';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { FEEDS_LIMIT } from '@shared/tokens';

@Component({
  selector: 'rx-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, OnDestroy {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  private _subscription: Subscription | undefined;

  public readonly feedsLimit: number = inject(FEEDS_LIMIT);

  public currentPage: number = 1;
  public baseUrl: string = '';
  public feed$!: Observable<FeedResponseInterface | null>;

  @Input({
    alias: 'url-feed',
    required: true,
  })
  public url: string = '';

  ngOnInit(): void {
    this._fetchData();
    this._initializeValues();
    this._initializeListeners();
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  private _fetchData(): void {
    this._store.dispatch(getFeedAction({ request: this.url }));
  }

  private _initializeValues(): void {
    this.feed$ = this._store.pipe(select(dataFeedSelector)) || null;
    this.baseUrl = this._router.url.split('?')[0];
  }

  private _initializeListeners(): void {
    this._subscription = this._route.queryParams.subscribe(
      (params: Params): void => {
        this.currentPage = Number(params['page'] || '1');
      }
    );
  }
}
