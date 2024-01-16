import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  numberAttribute,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { range } from '@shared/helpers';

@Component({
  selector: 'rx-pagination',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  /**
   * Общее количество статей
   */
  @Input({
    alias: 'total-articles',
    required: true,
    transform: numberAttribute,
  })
  public totalArticles: number = 0;

  /**
   * Лимит количества отображаемых на странице статей
   */
  @Input({
    alias: 'limit-articles',
    required: true,
  })
  public limitArticles: number = 0;

  /**
   * URL текущей страницы
   */
  @Input({
    alias: 'url-articles',
    required: true,
  })
  public currentUrl: string = '';

  /**
   * Текущая страница
   */
  @Input({
    alias: 'current-page',
    required: true,
  })
  public currentPage: number = 1;

  private pagesCount: number = 0;
  public pages: number[] = [];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalArticles / this.limitArticles);
    this.pages = range(1, this.pagesCount);
  }
}
