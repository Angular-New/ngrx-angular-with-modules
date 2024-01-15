import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getFeedAction } from '@feed/store/actions';
import { dataFeedSelector } from '@feed/store/selectors';
import { FeedResponseInterface } from '@feed/types';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'rx-feed',
  standalone: true,
  imports: [AsyncPipe, RouterModule, ErrorMessageComponent, LoadingComponent],
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  private readonly _store = inject(Store);

  public feed$!: Observable<FeedResponseInterface | null>;

  @Input({
    alias: 'url-feed',
    required: true,
  })
  public url: string = '';

  ngOnInit(): void {
    this._fetchData();
    this._initializeValues();
  }

  private _fetchData(): void {
    this._store.dispatch(getFeedAction({ request: this.url }));
  }

  private _initializeValues(): void {
    this.feed$ = this._store.pipe(select(dataFeedSelector)) || null;
  }
}
