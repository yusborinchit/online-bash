import { createCommandLog } from "../components/command-log";
import { createEchoLog } from "../components/echo-log";
import { createErrorLog } from "../components/error-log";
import { createHelpLog } from "../components/help-log";
import { createLsLog } from "../components/ls-log";
import { bash_input, bash_logs, bash_path } from "../consts/dom-elements";
import { Bash, bash } from "../models/bash";

export function handleFormSubmit(submit_event: SubmitEvent) {
  submit_event.preventDefault();

  const current_path = bash.getCurrentPath();

  const input_value = bash_input.value;
  bash_input.value = "";

  try {
    const [command, ...args] = input_value.split(" ");

    bash_logs.appendChild(createCommandLog(current_path, input_value));

    if (!Bash.COMMANDS_LIST.includes(command) && command !== "")
      throw new Error("Command not found.");

    if (command === Bash.HELP_COMMAND) {
      bash_logs.appendChild(createHelpLog());
    }

    if (command === Bash.ECHO_COMMAND) {
      const text = args.join(" ");
      bash_logs.appendChild(createEchoLog(text));
    }

    if (command === Bash.CLS_COMMAND) {
      bash_logs.innerHTML = "";
    }

    if (command === Bash.LS_COMMAND) {
      const ls_info = bash.listItems();
      bash_logs.appendChild(createLsLog(ls_info));
    }

    if (command === Bash.CD_COMMAND) {
      const [directory_path] = args;

      if (directory_path === undefined)
        throw new Error("Directory path not found.");

      bash.changeDirectory(directory_path);
      bash_path.textContent = bash.getCurrentPath();
    }

    if (command === Bash.MKDIR_COMMAND) {
      const [directory_path] = args;

      if (directory_path === undefined)
        throw new Error("Directory path not found.");

      bash.makeDirectory(directory_path);
    }

    if (command === Bash.RMDIR_COMMAND) {
      const [path] = args;

      if (path === undefined)
        throw new Error("Directory or File path not found.");

      bash.removeDirectory(path);
    }

    if (command === Bash.TOUCH_COMMAND) {
      const [file_path] = args;

      if (file_path === undefined) throw new Error("File path not found.");

      bash.createFile(file_path);
    }

    if (command === Bash.CAT_COMMAND) {
      const [file_path] = args;

      if (file_path === undefined) throw new Error("File path not found.");
      const file_content = bash.readFile(file_path);

      bash_logs.appendChild(createEchoLog(file_content));
    }

    if (command === Bash.WRITE_COMMAND) {
      const [file_path, ...file_content] = args;

      if (file_path === undefined) throw new Error("File path not found.");
      if (file_content === undefined) throw new Error("Text not found.");

      bash.writeFile(file_path, file_content.join(" "));
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    bash_logs.appendChild(createErrorLog(error.message));
  } finally {
    bash.addCommandToHistory(input_value);
    window.scrollTo({ top: document.body.clientHeight });
  }
}
