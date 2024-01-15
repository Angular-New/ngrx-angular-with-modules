import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedComponent } from '@shared/components/feed/feed.component';

import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { GlobalFeedRoutingModule } from './global-feed-routing.module';

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [CommonModule, GlobalFeedRoutingModule, FeedComponent],
})
export class GlobalFeedModule {}
