import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rx-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
