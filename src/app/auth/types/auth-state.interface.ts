import { CurrentUserInterface, ResponseErrorsInterface } from '@shared/types';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: ResponseErrorsInterface | null;
}
