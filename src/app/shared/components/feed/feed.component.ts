import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rx-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {}
