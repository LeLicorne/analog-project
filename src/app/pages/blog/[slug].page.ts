import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import type PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
      <article>
        <img class="post__image" [src]="post.attributes.coverImage" alt="" />
        <analog-markdown [content]="post.content" />
      </article>
    }
  `,
  styles: `
    .post__image {
      max-height: 40vh;
    }
  `,
})
export default class BlogPost {
  readonly post$ = injectContent<PostAttributes>('slug');
}
