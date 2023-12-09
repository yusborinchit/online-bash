import { BashItem } from "./bash-item";

export class Directory extends BashItem {
  private children: BashItem[];

  public constructor(parent: BashItem | undefined, name: string) {
    super(parent, name);
    this.children = [];
  }

  public getChildren(): BashItem[] {
    return [...this.children];
  }

  // TODO: refactor errors into custom errors
  public findChild(child_name: string): BashItem | undefined {
    return this.children.find((child) => child.getName() === child_name);
  }

  public addChild(child: BashItem): void {
    const child_name = child.getName();

    if (this.findChild(child_name) !== undefined)
      throw new Error("File already exists");

    this.children.push(child);
  }

  public removeChild(child_name: string): void {
    const child_index = this.children.findIndex(
      (child) => child.getName() === child_name
    );

    if (child_index === -1) throw new Error("File doesn't exists");

    this.children.splice(child_index, 1);
  }
}
