import { ProfileInterface } from '@shared/types';

export interface ArticleInterface {
  author: ProfileInterface;
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  description: string;
  favorited: boolean;
  favoritesCount: number;
}
