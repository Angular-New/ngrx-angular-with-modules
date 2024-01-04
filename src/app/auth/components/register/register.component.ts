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
import { AuthService } from '@auth/services';
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
  private readonly _authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this._initializeForm();
    this._initializeValues();
  }

  public onSubmit(): void {
    if (this.form.value) {
      this._store.dispatch(registerAction(this.form.value));
      this._authService.register(this.form.value).subscribe();
      this.form.reset();
    }
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
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }
}
