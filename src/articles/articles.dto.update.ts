export class UpdateArticleDTO{
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly date: Date;
  readonly author: string;
  readonly section: string;
  readonly media: string;
}
