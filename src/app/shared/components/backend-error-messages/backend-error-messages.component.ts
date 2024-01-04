import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResponseErrorsInterface } from '@shared/types';

@Component({
  selector: 'rx-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorMessagesComponent {
  @Input({
    alias: 'error-messages',
    transform: (value: ResponseErrorsInterface): string[] =>
      Object.keys(value).map((name: string): string => {
        const messages: string = value[name].join(', ');

        return `${name} ${messages}`;
      }),
  })
  public messages: string[] = [];
}
