import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { registerAction } from '@auth/store/actions';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@auth/store/selectors';
import { ResponseErrorsInterface } from '@shared/types';

@Component({
  selector: 'rx-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitting$!: Observable<boolean>;
  public validationErrors$!: Observable<ResponseErrorsInterface | null>;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _store: Store = inject(Store);

  ngOnInit(): void {
    this._initializeForm();
    this._initializeValues();
  }

  public onSubmit(): void {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = this.form.value;

    this._store.dispatch(
      registerAction({ request: { username, email, password } })
    );
    this.form.reset();
  }

  private _initializeForm(): void {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private _initializeValues(): void {
    // @ts-expect-error Some strange type error
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector));
    // @ts-expect-error Some strange type error
    this.validationErrors$ = this._store.pipe(select(validationErrorsSelector));
  }
}
