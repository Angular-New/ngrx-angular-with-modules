import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const WINDOW: InjectionToken<Window> = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => inject(DOCUMENT).defaultView!,
  }
);
