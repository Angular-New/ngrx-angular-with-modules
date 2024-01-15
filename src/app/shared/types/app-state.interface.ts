import { AuthStateInterface } from '@auth/types';
import { FeedStateInterface } from '@feed/types';

export interface GlobalStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
}
