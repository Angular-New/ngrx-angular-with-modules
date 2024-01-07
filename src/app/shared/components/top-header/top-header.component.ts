import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CurrentUserInterface } from '@shared/types';
import { select, Store } from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '@auth/store/selectors';

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
    // @ts-ignore
    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector));
    // @ts-ignore
    this.currentUser$ = this._store.pipe(select(currentUserSelector));
    // @ts-ignore
    this.isAnonymous$ = this._store.pipe(select(isAnonymousSelector));
  }
}
