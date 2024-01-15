import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rx-global-feed',
  templateUrl: './global-feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFeedComponent {
  public readonly url: string = '/articles';
}
