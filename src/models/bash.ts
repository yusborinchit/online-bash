import { BashItem } from "./bash-items/bash-item";
import { Directory } from "./bash-items/directory";
import { File } from "./bash-items/file";

export interface CommandDescription {
  command: string;
  description: string;
}

export class Bash {
  public static readonly LS_COMMAND = "ls";
  public static readonly CD_COMMAND = "cd";
  public static readonly MKDIR_COMMAND = "mkdir";
  public static readonly RMDIR_COMMAND = "rmdir";
  public static readonly CLS_COMMAND = "clear";
  public static readonly ECHO_COMMAND = "echo";
  public static readonly TOUCH_COMMAND = "touch";
  public static readonly CAT_COMMAND = "cat";
  public static readonly WRITE_COMMAND = "write";
  public static readonly HELP_COMMAND = "help";

  public static readonly COMMANDS_DESCRIPTIONS = [
    {
      command: `${Bash.LS_COMMAND}`,
      description: "Lists directory contents.",
    },
    {
      command: `${Bash.CD_COMMAND} &lt;path&gt;`,
      description: "Changes the current directory.",
    },
    {
      command: `${Bash.MKDIR_COMMAND} &lt;path&gt;`,
      description: "Creates a new directory.",
    },
    {
      command: `${Bash.RMDIR_COMMAND} &lt;path&gt;`,
      description: "Removes a directory.",
    },
    {
      command: `${Bash.ECHO_COMMAND} &lt;text&gt;`,
      description: "Displays a line of text.",
    },
    {
      command: `${Bash.TOUCH_COMMAND} &lt;path&gt;`,
      description: "Creates an empty file.",
    },
    {
      command: `${Bash.CAT_COMMAND} &lt;path&gt;`,
      description: "Displays file content.",
    },
    {
      command: `${Bash.WRITE_COMMAND} &lt;path&gt; &lt;content&gt;`,
      description: "Writes data to a file.",
    },
    {
      command: `${Bash.CLS_COMMAND}`,
      description: "Clears the screen.",
    },
    {
      command: `${Bash.HELP_COMMAND}`,
      description: "Displays the list of built-in commands.",
    },
  ];

  public static readonly COMMANDS_LIST = [
    Bash.LS_COMMAND,
    Bash.CD_COMMAND,
    Bash.MKDIR_COMMAND,
    Bash.RMDIR_COMMAND,
    Bash.CLS_COMMAND,
    Bash.ECHO_COMMAND,
    Bash.TOUCH_COMMAND,
    Bash.CAT_COMMAND,
    Bash.WRITE_COMMAND,
    Bash.HELP_COMMAND,
  ];

  private root: Directory;
  private current_directory: Directory;
  private commands_history: string[];

  public constructor() {
    this.root = new Directory(undefined, "$");
    this.current_directory = this.root;
    this.commands_history = [];
  }

  public addCommandToHistory(new_command: string): void {
    this.commands_history.push(new_command);
  }

  public getCommandHistory(): string[] {
    return [...this.commands_history];
  }

  public getCurrentPath(): string {
    return this.current_directory.getPath();
  }

  public listItems(): BashItem[] {
    return this.current_directory.getChildren();
  }

  public changeDirectory(directory_path: string): Bash {
    const [directory_name, ...rest] = directory_path.split("/");

    if (directory_name === ".") {
      if (rest.length > 0) return this.changeDirectory(rest.join("/"));
      return this;
    }

    if (directory_name === "..") {
      const parent = this.current_directory.getParent() as Directory;

      if (parent === undefined) return this;
      this.current_directory = parent;

      if (rest.length > 0) return this.changeDirectory(rest.join("/"));
      return this;
    }

    const directory = this.current_directory.findChild(directory_name);

    if (directory === undefined) throw new Error("Directory not found");
    if (!(directory instanceof Directory)) throw new Error("Route not valid");

    if (rest.length === 0) {
      this.current_directory = directory;
      return this;
    }

    this.current_directory = directory;
    this.changeDirectory(rest.join("/"));

    return this;
  }

  public makeDirectory(directory_path: string, origin?: Directory): Bash {
    if (origin === undefined) origin = this.current_directory;

    const [directory_name, ...rest] = directory_path.split("/");

    const new_directory = new Directory(this.current_directory, directory_name);
    this.current_directory.addChild(new_directory);

    if (rest.length === 0) {
      this.current_directory = origin;
      return this;
    }

    this.current_directory = new_directory;
    this.makeDirectory(rest.join("/"), origin);

    return this;
  }

  public removeDirectory(directory_path: string, origin?: Directory): Bash {
    if (origin === undefined) origin = this.current_directory;

    const [directory_name, ...rest] = directory_path.split("/");

    if (rest.length === 0) {
      this.current_directory.removeChild(directory_name);
      this.current_directory = origin;
      return this;
    }

    const directory = this.current_directory.findChild(directory_name);

    if (!(directory instanceof Directory)) throw new Error("Route not valid");

    this.current_directory = directory;
    this.removeDirectory(rest.join("/"), origin);

    return this;
  }

  public createFile(file_path: string, origin?: Directory): Bash {
    if (origin === undefined) origin = this.current_directory;

    const [directory_name, ...rest] = file_path.split("/");

    if (rest.length === 0) {
      const file_name = directory_name;

      const file = new File(this.current_directory, file_name);
      this.current_directory.addChild(file);

      this.current_directory = origin;
      return this;
    }

    this.changeDirectory(directory_name);
    this.createFile(rest.join("/"), origin);

    return this;
  }

  public readFile(file_path: string, origin?: Directory): string {
    if (origin === undefined) origin = this.current_directory;

    const [directory_name, ...rest] = file_path.split("/");

    if (rest.length === 0) {
      const file_name = directory_name;

      const file = this.current_directory.findChild(file_name) as File;
      const file_content = file.readFile();

      this.current_directory = origin;
      return file_content;
    }

    this.changeDirectory(directory_name);
    return this.readFile(rest.join("/"), origin);
  }

  public writeFile(
    file_path: string,
    file_content: string,
    origin?: Directory
  ): Bash {
    if (origin === undefined) origin = this.current_directory;

    const [directory_name, ...rest] = file_path.split("/");

    if (rest.length === 0) {
      const file_name = directory_name;

      const file = this.current_directory.findChild(file_name) as File;
      file.overwriteContent(file_content);

      this.current_directory = origin;
      return this;
    }

    this.changeDirectory(directory_name);
    this.writeFile(rest.join("/"), file_content, origin);

    return this;
  }
}

export const bash = new Bash();
