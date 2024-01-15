import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FeedService } from '@feed/services';
import { GetFeedEffect } from '@feed/store/effects';
import { feedFeatureKey, feedReducer } from '@feed/store/reducers';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FeedComponent } from '@shared/components/feed/feed.component';

import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { GlobalFeedRoutingModule } from './global-feed-routing.module';

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [
    CommonModule,
    GlobalFeedRoutingModule,
    FeedComponent,
    BannerComponent,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature(feedFeatureKey, feedReducer),
  ],
  providers: [FeedService],
})
export class GlobalFeedModule {}
