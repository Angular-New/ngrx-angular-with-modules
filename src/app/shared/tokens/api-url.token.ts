import { InjectionToken } from '@angular/core';

import { environment } from '@environments/environment';

export const API_URL: InjectionToken<string> = new InjectionToken<string>(
  'Base URL',
  { providedIn: 'root', factory: () => environment.api_url }
);
