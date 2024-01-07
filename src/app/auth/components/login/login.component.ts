import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseErrorsInterface } from '@shared/types';
import { select, Store } from '@ngrx/store';
import { loginAction } from '@auth/store/actions';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@auth/store/selectors';

@Component({
  selector: 'rx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
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
    const { email, password }: { email: string; password: string } =
      this.form.value;

    this._store.dispatch(loginAction({ request: { email, password } }));
    this.form.reset();
  }

  private _initializeForm(): void {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private _initializeValues(): void {
    // @ts-ignore
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector));
    // @ts-ignore
    this.validationErrors$ = this._store.pipe(select(validationErrorsSelector));
  }
}
