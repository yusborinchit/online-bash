import { bash_input } from "../consts/dom-elements";
import { bash } from "../models/bash";

let history_offset = 0;

export function handleInputKeyDown(event: KeyboardEvent) {
  const { key } = event;

  if (key === "ArrowUp") {
    history_offset++;

    const command_history = bash.getCommandHistory();
    const history_length = command_history.length;

    const last_command_index = history_length - history_offset;
    let last_command;

    if (last_command_index > 0) {
      last_command = command_history[last_command_index];
    } else {
      last_command = command_history[last_command_index];
      history_offset = 0;
    }

    if (last_command === undefined) return;
    bash_input.value = last_command;

    setTimeout(() => {
      bash_input.setSelectionRange(0, last_command.length);
    }, 0);

    return;
  }

  if (key === "Tab") {
    event.preventDefault();

    const last_word = bash_input.value.split(" ").reverse()[0] ?? "";
    const first_coincidence = bash
      .listItems()
      .find((item) => item.getName().startsWith(last_word));

    if (first_coincidence === undefined) return;

    const current_input = bash_input.value ?? "";
    const current_words = current_input.split(" ");

    const autocompleted_input =
      current_words.length > 1
        ? [
            ...current_words.reverse().slice(-1),
            first_coincidence.getName(),
          ].join(" ")
        : first_coincidence.getName();

    bash_input.value = autocompleted_input;

    setTimeout(() => {
      bash_input.setSelectionRange(
        autocompleted_input.length,
        autocompleted_input.length
      );
    }, 0);

    return;
  }

  history_offset = 0;
}
