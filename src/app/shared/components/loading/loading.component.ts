import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rx-loading',
  standalone: true,
  template: `<div>Loading...</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
