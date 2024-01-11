import { Injectable } from '@angular/core';

import { RegisterResponseInterface } from '@auth/types';
import { CurrentUserInterface } from '@shared/types';

@Injectable()
export class AuthMapper {
  public getUser(data: RegisterResponseInterface): CurrentUserInterface {
    return data.user;
  }

  public getBody<T>(data: T): unknown {
    return { user: { ...data } };
  }
}
