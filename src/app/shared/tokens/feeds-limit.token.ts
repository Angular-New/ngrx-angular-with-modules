import { InjectionToken } from '@angular/core';

import { environment } from '@environments/environment.development';

export const FEEDS_LIMIT: InjectionToken<number> = new InjectionToken<number>(
  'Feeds limit',
  {
    providedIn: 'root',
    factory: () => environment.feeds_limit,
  }
);
