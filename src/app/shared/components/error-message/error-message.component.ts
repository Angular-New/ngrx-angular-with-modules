import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rx-error-message',
  standalone: true,
  template: `<div>{{ message }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input({
    alias: 'error-message',
    required: false,
  })
  public message: string = 'Something went wrong ...';
}
