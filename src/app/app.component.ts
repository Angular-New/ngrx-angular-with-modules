import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchUserAction } from '@auth/store/actions';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _store: Store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(fetchUserAction());
  }
}
