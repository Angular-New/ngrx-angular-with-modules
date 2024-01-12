import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '@auth/store/selectors';
import { CurrentUserInterface } from '@shared/types';

@Component({
  selector: 'rx-top-header',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './top-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent implements OnInit {
  private readonly _store: Store = inject(Store);

  public isLoggedIn$!: Observable<boolean>;
  public isAnonymous$!: Observable<boolean>;
  public currentUser$!: Observable<CurrentUserInterface>;

  ngOnInit(): void {
    this._initializeValues();
  }

  private _initializeValues(): void {
    // @ts-expect-error Some strange type error
    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector));
    // @ts-expect-error Some strange type error
    this.currentUser$ = this._store.pipe(select(currentUserSelector));
    // @ts-expect-error Some strange type error
    this.isAnonymous$ = this._store.pipe(select(isAnonymousSelector));
  }
}
