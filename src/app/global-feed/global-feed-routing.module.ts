import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GLOBAL_FEED } from './routes';

@NgModule({
  imports: [RouterModule.forChild(GLOBAL_FEED)],
  exports: [RouterModule],
})
export class GlobalFeedRoutingModule {}
