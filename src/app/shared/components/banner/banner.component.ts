import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rx-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
