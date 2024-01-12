import { Injectable, inject } from '@angular/core';

import { WINDOW } from '@shared/tokens';

export enum EPersistence {
  AccessToken = 'AccessToken',
}

@Injectable()
export class PersistenceService {
  private readonly _window: Window = inject(WINDOW);

  public setToken(key: string, data: unknown): void {
    try {
      this._window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localstorage', e);
    }
  }

  public getToken(key: string): unknown {
    try {
      const data: string = <string>this._window.localStorage.getItem(key);
      return JSON.parse(data);
    } catch (e) {
      console.error('Error getting data form localstorage', e);

      return null;
    }
  }
}
