import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { EPersistence, PersistenceService } from '@shared/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly _persistenceService = inject(PersistenceService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._persistenceService.getToken(EPersistence.AccessToken);
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    });

    return next.handle(request);
  }
}
