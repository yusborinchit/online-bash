import { BashItem } from "./bash-item";

export class File extends BashItem {
  private content: string;

  public constructor(parent: BashItem | undefined, name: string) {
    super(parent, name);
    this.content = "hello world";
  }

  public readFile() {
    return this.content;
  }

  public concatenateContent(text: string): void {
    this.content = `${this.content}${text}`;
  }

  public overwriteContent(text: string): void {
    this.content = text;
  }
}
