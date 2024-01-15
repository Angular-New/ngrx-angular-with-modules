import { ArticleInterface } from '@shared/types';

export interface FeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
