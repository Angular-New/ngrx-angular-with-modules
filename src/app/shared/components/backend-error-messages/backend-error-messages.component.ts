import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rx-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorMessagesComponent {
  @Input({
    alias: 'error-messages',
  })
  public messages!: string[];
}
