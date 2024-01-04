import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { registerAction } from '@auth/store/actions';
import { isSubmittingSelector } from '@auth/store/selectors';

@Component({
  selector: 'rx-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitting$!: Observable<boolean>;

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
    // @ts-ignore
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector));
  }
}
