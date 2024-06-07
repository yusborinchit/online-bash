import { Bash, type CommandDescription } from "../models/bash";

function createHelpRow(command: CommandDescription) {
  return `
    <li class="ml-[4ch] grid max-w-[80ch] grid-cols-[24ch_auto] gap-[8ch]">
      <span class="text-zinc-400">${command.command}</span>
      <span>${command.description}</span>
    </li>
  `;
}

export function createHelpLog() {
  const commands = Bash.COMMANDS_DESCRIPTIONS;
  const help_log = document.createElement("ul");

  help_log.className = "flex flex-col";
  help_log.innerHTML = `
    ${commands.map((command) => createHelpRow(command)).join("")}
  `;

  return help_log;
}
