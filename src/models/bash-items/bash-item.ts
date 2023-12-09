export abstract class BashItem {
  protected parent?: BashItem;
  protected name: string;
  protected path: string;
  protected permissions: "rw" | "r" | "w";

  public constructor(parent: BashItem | undefined, name: string) {
    this.parent = parent;
    this.name = name;
    this.path = parent ? `${parent.path}/${name}` : name;
    this.permissions = "rw";
  }

  public getParent(): BashItem | undefined {
    return this.parent;
  }

  public getName(): string {
    return this.name;
  }

  public getPath(): string {
    return this.path;
  }

  public getPermissions(): "rw" | "r" | "w" {
    return this.permissions;
  }
}
