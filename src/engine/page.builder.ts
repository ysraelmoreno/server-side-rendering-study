export class PageBuilder {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  protected changeContentKeys(params: Record<string, any>, parent?: string) {
    const keys = Object.keys(params);

    keys.forEach((key) => {
      if (typeof params[key] === "object")
        return this.changeContentKeys(
          params[key],
          parent ? `${parent}.${key}` : key
        );

      this.content = this.content.replace(`{{${parent}.${key}}}`, params[key]);
    });

    return this.content;
  }

  public render(params: Record<string, any>) {
    return this.changeContentKeys(params);
  }
}
