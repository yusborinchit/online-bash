import { Bash } from "./bash";

export class BashSingleton {
  public static bash: Bash;

  public static getBashInstance(): Bash {
    return BashSingleton.bash ?? new Bash();
  }
}
